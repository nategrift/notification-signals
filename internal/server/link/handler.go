package link

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

type CreateLinkRequest struct {
	Name          string `json:"name"`
	ServiceID     uint   `json:"serviceID"`
	DestinationID string `json:"destinationID"`
}

func (h *Handler) CreateLink(c *gin.Context) {
	// get ApiKey
	apiKeyIDStr := c.Param("keyID")
	apiKeyID, err := strconv.ParseUint(apiKeyIDStr, 10, 32)
	if err != nil || apiKeyIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ApiKey ID"})
		return
	}

	var req CreateLinkRequest
	if err := c.ShouldBindJSON(&req); err != nil || req.DestinationID == "" || req.ServiceID == 0 || req.Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	link, err := h.service.CreateLink(req, uint(apiKeyID))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Link Created", "link": link})
}

func (h *Handler) GetAllLinks(c *gin.Context) {
	// get ApiKey
	apiKeyIDStr := c.Param("keyID")
	apiKeyID, err := strconv.ParseUint(apiKeyIDStr, 10, 32)
	if err != nil || apiKeyIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ApiKey ID"})
		return
	}

	keys, err := h.service.GetAllLinksForApiKey(uint(apiKeyID))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No links for this Api Key was found."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"apiKeys": keys})
}

func (h *Handler) DeleteLink(c *gin.Context) {
	linkIDStr := c.Param("linkID")
	linkID, err := strconv.ParseUint(linkIDStr, 10, 32)
	if err != nil || linkIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Link ID"})
		return
	}

	deleteErr := h.service.DeleteLinkByID(uint(linkID))
	if deleteErr != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Link not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Link has been deleted"})
}
