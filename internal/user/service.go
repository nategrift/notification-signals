package user

import (
	"github.com/nategrift/notification-signals/pkg/model"
	"gorm.io/gorm"
)

type Service struct {
	db *gorm.DB
}

func NewService(db *gorm.DB) *Service {
	return &Service{db}
}

func (s *Service) GetUserByID(id string) (*model.User, error) {
	var user model.User
	result := s.db.First(&user, "id = ?", id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

func (s *Service) DeleteUserByID(id string) error {
	result := s.db.Delete(&model.User{}, "id = ?", id)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (s *Service) UpdateUserByID(id string, updatedUser model.UserUpdateInput) error {
	var user model.User
	if result := s.db.First(&user, "id = ?", id); result.Error != nil {
		return result.Error
	}

	if result := s.db.Model(&user).Updates(updatedUser); result.Error != nil {
		return result.Error
	}

	return nil
}
