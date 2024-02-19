package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUserIDOnRequest(c *gin.Context) (uint, bool) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "userID not provided"})
		return 0, false
	}

	userIDUint, ok := userID.(uint)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "userID must be a uint"})
		return 0, false
	}

	return userIDUint, true
}
