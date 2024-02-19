package project

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

func (s *Service) CreateProject(req CreateProjectRequest, CreatedByUserID uint) error {
	project := model.Project{
		Name:            req.Name,
		CreatedByUserID: CreatedByUserID,
	}
	result := s.db.Create(&project)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (s *Service) GetProjectByID(projectID string) (*model.Project, error) {
	var project model.Project
	result := s.db.First(&project, "id = ?", projectID)
	if result.Error != nil {
		return nil, result.Error
	}
	return &project, nil
}

func (s *Service) GetAllProjectsForUser(userID uint) ([]model.Project, error) {
	var projects []model.Project
	result := s.db.Where("created_by_user_id = ?", userID).Find(&projects)
	if result.Error != nil {
		return nil, result.Error
	}
	return projects, nil
}

func (s *Service) DeleteProjectByID(id string) error {
	result := s.db.Delete(&model.Project{}, "id = ?", id)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (s *Service) UpdateProjectByID(id string, updatedProject model.ProjectUpdateInput) error {
	var project model.Project
	if result := s.db.First(&project, "id = ?", id); result.Error != nil {
		return result.Error
	}

	if result := s.db.Model(&project).Updates(updatedProject); result.Error != nil {
		return result.Error
	}

	return nil
}
