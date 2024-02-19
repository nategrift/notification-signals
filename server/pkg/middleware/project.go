package middleware

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nategrift/notification-signals/pkg/model"
	"github.com/nategrift/notification-signals/pkg/utils"
	"gorm.io/gorm"
)

func ProjectAccessMiddleware(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, exists := utils.GetUserIDOnRequest(c)
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		projectID := c.Param("projectID") // project id associated
		if projectID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Project ID is required"})
			c.Abort()
			return
		}

		var project model.Project
		if err := db.Where("id = ? AND created_by_user_id = ?", projectID, userID).First(&project).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				c.JSON(http.StatusForbidden, gin.H{"error": "Access denied or project not found"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
			}
			c.Abort()
			return
		}

		c.Next()
	}
}
