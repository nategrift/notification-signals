package notification

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

type NotificationRequest struct {
	ApiKey  string `json:"apiKey"`
	Title   string `json:"title"`
	Message string `json:"message"`
}

func (h *Handler) SendNotification(c *gin.Context) {
	var req NotificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	key, err := h.service.ApiKeyRetriever.GetApiKeyByKey(req.ApiKey)
	if key == nil || err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unable to find api key"})
		return
	}

	links, linkErr := h.service.LinkRetriever.GetAllLinksForApiKey(key.ID)
	if linkErr != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No Links for this key"})
		return
	}

	// send all notifications for the links
	var HasError bool = false
	for _, link := range links {
		notificationErr := h.service.SendNotification(req, link.DestinationID)
		if notificationErr != nil {
			HasError = true
		}

	}

	// TODO: add more detailed failed notifications here
	if HasError {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Some notifications were unable to send"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Notification Sent"})
}
