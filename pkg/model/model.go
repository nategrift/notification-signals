package model

import (
	"time"

	"gorm.io/gorm"
)

type UserUpdateInput struct {
	Username string
	Email    string
}

type User struct {
	ID        uint   `gorm:"primaryKey"`
	Username  string `gorm:"unique;not null"`
	Email     string `gorm:"unique;not null"`
	Password  string `gorm:"not null" json:"-"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type RefreshToken struct {
	gorm.Model
	Token     string    `gorm:"unique;not null"`
	UserID    uint      `gorm:"not null"`
	ExpiresAt time.Time `gorm:"not null"`
}
