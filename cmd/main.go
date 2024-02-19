package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/nategrift/notification-signals/internal/apikey"
	"github.com/nategrift/notification-signals/internal/auth"
	"github.com/nategrift/notification-signals/internal/project"
	"github.com/nategrift/notification-signals/internal/user"
	"github.com/nategrift/notification-signals/pkg/database"
	"github.com/nategrift/notification-signals/pkg/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	err := godotenv.Load(".env.dev", ".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config := database.NewDatabaseConfig()
	db := database.SetupDatabase(config)

	// service layers
	userService := user.NewService(db)
	// auth service needs to fetch users and use other relevant methods which are all defined in an the auth.UserRetriever interface
	authService := auth.NewService(db, userService)
	projectService := project.NewService(db)
	apikeyService := apikey.NewService(db)

	// handlers
	authHandler := auth.NewHandler(authService)
	userHandler := user.NewHandler(userService)
	projectHandler := project.NewHandler(projectService)
	apiKeyHandler := apikey.NewHandler(apikeyService)

	// setup api group
	apiGroup := router.Group("/api")

	// Setup all routes
	authGroup := apiGroup.Group("/auth")
	{
		authGroup.POST("/login", authHandler.Login)
		authGroup.POST("/create", authHandler.CreateAccount)
	}
	userGroup := apiGroup.Group("/user")
	{
		userGroup.Use(middleware.AuthMiddleware())
		userGroup.GET("/:id", userHandler.GetUser)
		userGroup.DELETE("/:id", userHandler.DeleteUser)
		userGroup.PATCH("/:id", userHandler.UpdateUser)
	}
	projectGroup := apiGroup.Group("/project")
	{
		projectGroup.Use(middleware.AuthMiddleware())
		projectGroup.POST("/", projectHandler.CreateProject)
		projectGroup.GET("/", projectHandler.GetAllProjects)
		projectGroup.GET("/:projectID", middleware.ProjectAccessMiddleware(db), projectHandler.GetProject)
		projectGroup.DELETE("/:projectID", middleware.ProjectAccessMiddleware(db), projectHandler.DeleteProject)
		projectGroup.PATCH("/:projectID", middleware.ProjectAccessMiddleware(db), projectHandler.UpdateProject)

		apiKeyGroup := projectGroup.Group("/:projectID/key")
		{
			apiKeyGroup.Use(middleware.ProjectAccessMiddleware(db))
			apiKeyGroup.POST("/", apiKeyHandler.CreateApiKey)
			apiKeyGroup.GET("/", apiKeyHandler.GetApiKeys)
			apiKeyGroup.DELETE("/:keyID", apiKeyHandler.DeleteApiKey)
		}
	}

	router.Run(":8080")
}
