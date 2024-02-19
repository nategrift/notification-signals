package project

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nategrift/notification-signals/pkg/model"
	"github.com/nategrift/notification-signals/pkg/utils"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

type CreateProjectRequest struct {
	Name string `json:"name"`
}

func (h *Handler) CreateProject(c *gin.Context) {
	var req CreateProjectRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	userID, exists := utils.GetUserIDOnRequest(c)
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID attached to request"})
		return
	}
	err := h.service.CreateProject(req, userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Created Project"})
}

func (h *Handler) GetProject(c *gin.Context) {
	projectID := c.Param("id")
	if projectID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Project ID is required"})
		return
	}

	project, err := h.service.GetProjectByID(projectID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"project": project})
}

func (h *Handler) GetAllProjects(c *gin.Context) {
	userID, exists := utils.GetUserIDOnRequest(c)
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID attached to request"})
		return
	}

	project, err := h.service.GetAllProjectsForUser(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"projects": project})
}

func (h *Handler) DeleteProject(c *gin.Context) {
	projectID := c.Param("id")
	if projectID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Project ID is required"})
		return
	}

	err := h.service.DeleteProjectByID(projectID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Project has been deleted"})
}

func (h *Handler) UpdateProject(c *gin.Context) {
	var updatedProject model.ProjectUpdateInput
	projectID := c.Param("id")
	if projectID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Project ID is required"})
		return
	}

	if err := c.ShouldBindJSON(&updatedProject); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.UpdateProjectByID(projectID, updatedProject); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Project updated successfully"})
}
