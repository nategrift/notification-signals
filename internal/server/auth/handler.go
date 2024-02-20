package auth

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

type LoginRequest struct {
	Username     string `json:"username"`
	Password     string `json:"password"`
	RefreshToken string `json:"refreshToken"`
}

func (h *Handler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Check if logging in with a refresh token
	if req.RefreshToken != "" {
		// validate refresh token and get user ID
		userID, err := h.service.ValidateRefreshToken(req.RefreshToken)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid refresh token"})
			return
		}

		// Generate new JWT token
		user, _ := h.service.userRetriever.GetUserByID(strconv.FormatUint(uint64(userID), 10))
		token, tokenExp, err := GenerateJWT(user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"user":         user,
			"token":        token,
			"tokenExpires": tokenExp.Unix(),
		})
		return
	}

	// authenticate with username and password
	user, err := h.service.Authenticate(req.Username, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication failed"})
		return
	}

	// generate JWT token
	token, tokenExp, err := GenerateJWT(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// generate Refresh Token
	refreshToken, refreshExp, err := h.service.GenerateRefreshToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate refresh token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user":           user,
		"token":          token,
		"tokenExpires":   tokenExp.Unix(),
		"refreshToken":   refreshToken,
		"refreshExpires": refreshExp.Unix(),
	})
}

type CreateAccountRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *Handler) CreateAccount(c *gin.Context) {
	var req CreateAccountRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	input := CreateAccountRequest{
		Username: req.Username,
		Email:    req.Email,
		Password: req.Password,
	}

	err := h.service.CreateAccountService(input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Account created successfully"})
}
