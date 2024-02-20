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

type Project struct {
	gorm.Model
	Name            string `gorm:"not null"`
	CreatedByUserID uint   `gorm:"not null"`
	IsLocked        bool   `gorm:"default:false"`
}

type ProjectUpdateInput struct {
	Name     string
	IsLocked string
}

type ApiKey struct {
	gorm.Model
	Name            string `gorm:"not null"`
	Key             string `gorm:"not null" json:"-"`
	ProjectID       uint   `gorm:"not null"`
	CreatedByUserID uint   `gorm:"not null"`
}

type Link struct {
	gorm.Model
	Name          string `gorm:"not null"`
	ApiKeyID      uint   `gorm:"not null"`
	ServiceID     uint   `gorm:"not null"`
	DestinationID string `gorm:"not null"`
	IsEnabled     bool   `gorm:"default:true"`
}

type Service struct {
	Name string
}

// in the future we want to add more customized messages for each service
var ServicesMap = map[uint]Service{
	1: {Name: "Discord"},
}
