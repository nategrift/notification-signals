package apikey

import (
	"github.com/google/uuid"
	"github.com/nategrift/notification-signals/pkg/server/model"
	"gorm.io/gorm"
)

type Service struct {
	db *gorm.DB
}

func NewService(db *gorm.DB) *Service {
	return &Service{db}
}

func (s *Service) CreateApiKey(req CreateApiKeyRequest, ProjectID uint, CreatedByUserID uint) (model.ApiKey, error) {
	token := uuid.NewString()

	apiKey := model.ApiKey{
		Name:            req.Name,
		ProjectID:       ProjectID,
		CreatedByUserID: CreatedByUserID,
		Key:             token,
	}
	result := s.db.Create(&apiKey)
	if result.Error != nil {
		return model.ApiKey{}, result.Error
	}

	return apiKey, nil
}

func (s *Service) DeleteApiKeyByID(id string) error {
	result := s.db.Delete(&model.ApiKey{}, "id = ?", id)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (s *Service) GetAllApiKeysForProject(projectID string) ([]model.ApiKey, error) {
	var apiKeys []model.ApiKey
	result := s.db.Where("project_id = ?", projectID).Find(&apiKeys)
	if result.Error != nil {
		return nil, result.Error
	}
	return apiKeys, nil
}

func (s *Service) GetApiKeyByID(apiKeyID string) (*model.ApiKey, error) {
	var apiKey model.ApiKey
	result := s.db.First(&apiKey, "id = ?", apiKeyID)
	if result.Error != nil {
		return nil, result.Error
	}
	return &apiKey, nil
}

func (s *Service) GetApiKeyByKey(key string) (*model.ApiKey, error) {
	var apiKey model.ApiKey
	result := s.db.First(&apiKey, "key = ?", key)
	if result.Error != nil {
		return nil, result.Error
	}
	return &apiKey, nil
}
