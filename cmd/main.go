package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/nategrift/notification-signals/internal/auth"
	"github.com/nategrift/notification-signals/internal/user"
	"github.com/nategrift/notification-signals/pkg/database"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	err := godotenv.Load(".env.dev", ".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config := database.NewDatabaseConfig()
	db, err := database.SetupDatabase(config)

	// Setup middleware, e.g., logging, error handling, etc.

	// service layers
	authService := auth.NewService(db)
	userService := user.NewService(db)

	// handlers
	authHandler := auth.NewHandler(authService)
	userHandler := user.NewHandler(userService)

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
		userGroup.GET("/:id", userHandler.GetUser)
		userGroup.DELETE("/:id", userHandler.DeleteUser)
		userGroup.PATCH("/:id", userHandler.UpdateUser)
	}

	// Start server
	router.Run(":8080")
}
