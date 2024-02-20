package database

import (
	"fmt"
	"log"
	"os"

	"github.com/nategrift/notification-signals/pkg/server/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Config struct {
	DBUser     string
	DBPassword string
	DBHost     string
	DBPort     string
	DBName     string
}

func NewDatabaseConfig() *Config {
	return &Config{
		DBUser:     os.Getenv("DB_USER"),
		DBPassword: os.Getenv("DB_PASSWORD"),
		DBHost:     os.Getenv("DB_HOST"),
		DBPort:     os.Getenv("DB_PORT"),
		DBName:     os.Getenv("DB_NAME"),
	}
}

func SetupDatabase(config *Config) *gorm.DB {
	dsn := fmt.Sprintf("host=%s user=%s password=%s port=%s dbname=%s sslmode=disable TimeZone=Asia/Shanghai",
		config.DBHost, config.DBUser, config.DBPassword, config.DBPort, config.DBName)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(fmt.Sprintf("failed to connect to database: %v", err))
	}

	log.Println("Database connected successfully")

	Migrate(db)

	return db
}

func Migrate(db *gorm.DB) {
	// currently no data, so we are just auto migrating
	err := db.AutoMigrate(&model.User{}, &model.RefreshToken{}, &model.Project{}, &model.ApiKey{}, &model.Link{})
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}
}
