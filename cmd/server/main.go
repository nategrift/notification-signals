package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/nategrift/notification-signals/internal/server/apikey"
	"github.com/nategrift/notification-signals/internal/server/auth"
	"github.com/nategrift/notification-signals/internal/server/link"
	"github.com/nategrift/notification-signals/internal/server/notification"
	"github.com/nategrift/notification-signals/internal/server/project"
	"github.com/nategrift/notification-signals/internal/server/user"
	"github.com/nategrift/notification-signals/pkg/server/database"
	"github.com/nategrift/notification-signals/pkg/server/middleware"

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
	linkService := link.NewService(db)
	notificationService := notification.NewService(db, apikeyService, linkService)

	// handlers
	authHandler := auth.NewHandler(authService)
	userHandler := user.NewHandler(userService)
	projectHandler := project.NewHandler(projectService)
	apiKeyHandler := apikey.NewHandler(apikeyService)
	notificationHandler := notification.NewHandler(notificationService)
	linkHandler := link.NewHandler(linkService)

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

			// TODO: add authentication to make sure a keyID exists
			linkGroup := apiKeyGroup.Group("/:keyID/link")
			{
				linkGroup.POST("/", linkHandler.CreateLink)
				linkGroup.GET("/", linkHandler.GetAllLinks)
				linkGroup.DELETE("/:linkID", linkHandler.DeleteLink)
			}
		}
	}

	// Notify
	notificationGroup := router.Group("/notify")
	{
		// TODO: add proper auth with APIKEY
		notificationGroup.POST("/", notificationHandler.SendNotification)
	}

	router.Run(":8080")
}
