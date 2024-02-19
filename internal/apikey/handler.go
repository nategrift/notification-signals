package apikey

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nategrift/notification-signals/pkg/utils"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

type CreateApiKeyRequest struct {
	Name string `json:"name"`
}

func (h *Handler) CreateApiKey(c *gin.Context) {
	projectIDStr := c.Param("projectID")
	if projectIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Project ID is required"})
		return
	}

	// convert projectID from string to uint
	projectID, err := strconv.ParseUint(projectIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Project ID format"})
		return
	}

	var req CreateApiKeyRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	userID, exists := utils.GetUserIDOnRequest(c)
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID attached to request"})
		return
	}

	apiKey, err := h.service.CreateApiKey(req, uint(projectID), userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Created ApiKey, please save the apiKey, only displayed once.", "apiKey": apiKey, "apiKeySecret": apiKey.Key})
}

func (h *Handler) GetApiKeys(c *gin.Context) {
	projectID := c.Param("projectID")
	if projectID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Project ID is required"})
		return
	}

	keys, err := h.service.GetAllApiKeysForProject(projectID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No Api Keys found for this project."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"apiKeys": keys})
}

func (h *Handler) DeleteApiKey(c *gin.Context) {
	apiKeyID := c.Param("keyID")
	if apiKeyID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ApiKey ID is required"})
		return
	}

	err := h.service.DeleteApiKeyByID(apiKeyID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ApiKey not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ApiKey has been deleted"})
}
