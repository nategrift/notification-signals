package link

import (
	"github.com/nategrift/notification-signals/pkg/server/model"
	"gorm.io/gorm"
)

type Service struct {
	db *gorm.DB
}

func NewService(db *gorm.DB) *Service {
	return &Service{db}
}

func (s *Service) CreateLink(req CreateLinkRequest, ApiKeyID uint) (model.Link, error) {
	link := model.Link{

		Name:          req.Name,
		ApiKeyID:      ApiKeyID,
		ServiceID:     req.ServiceID,
		DestinationID: req.DestinationID,
	}
	result := s.db.Create(&link)
	if result.Error != nil {
		return model.Link{}, result.Error
	}

	return link, nil
}

func (s *Service) DeleteLinkByID(id uint) error {
	result := s.db.Delete(&model.Link{}, "id = ?", id)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (s *Service) GetAllLinksForApiKey(apiKey uint) ([]model.Link, error) {
	var links []model.Link
	result := s.db.Where("api_key_id = ?", apiKey).Find(&links)
	if result.Error != nil {
		return nil, result.Error
	}
	return links, nil
}

// func (s *Service) GetApiKeyByID(apiKeyID string) (*model.Project, error) {
// 	var apiKey model.Project
// 	result := s.db.First(&apiKey, "id = ?", apiKeyID)
// 	if result.Error != nil {
// 		return nil, result.Error
// 	}
// 	return &apiKey, nil
// }
