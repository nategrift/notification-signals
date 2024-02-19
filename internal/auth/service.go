package auth

import (
	"errors"
	"regexp"
	"time"

	"github.com/google/uuid"
	"github.com/nategrift/notification-signals/pkg/encrypt"
	"github.com/nategrift/notification-signals/pkg/model"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Service struct {
	db *gorm.DB
}

func NewService(db *gorm.DB) *Service {
	return &Service{db}
}

func (s *Service) Authenticate(username, password string) (*model.User, error) {
	var user model.User

	result := s.db.Where("username = ?", username).First(&user)
	if result.Error != nil {
		return nil, errors.New("invalid login credentials")
	}

	// check password with the stored hash.
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, errors.New("invalid login credentials")
	}

	return &user, nil
}

func (s *Service) CreateAccountService(input CreateAccountRequest) error {
	//input validation
	if input.Username == "" || input.Email == "" || input.Password == "" {
		return errors.New("username, email, and password are required")
	}

	if len(input.Password) < 8 || !regexp.MustCompile(`[A-Z]`).MatchString(input.Password) || !regexp.MustCompile(`[!@#$&*]`).MatchString(input.Password) {
		return errors.New("password must be at least 8 characters long, contain a capital letter and a symbol")
	}
	var count int64
	s.db.Model(&model.User{}).Where("username = ? OR email = ?", input.Username, input.Email).Count(&count)
	if count > 0 {
		return errors.New("a user with the given username or email already exists")
	}

	// hash password before we store it
	hashedPassword, err := encrypt.HashPassword(input.Password)
	if err != nil {
		return err
	}

	user := model.User{
		Username: input.Username,
		Email:    input.Email,
		Password: hashedPassword,
	}
	result := s.db.Create(&user)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (s *Service) GenerateRefreshToken(userID uint) (string, time.Time, error) {

	// delete any previous refresh tokens
	s.db.Where("user_id = ?", userID).Delete(&model.RefreshToken{})

	token := uuid.NewString()

	// expire after 30 days (make this a config variable)
	expiresAt := time.Now().Add(720 * time.Hour)

	refreshToken := model.RefreshToken{
		Token:     token,
		UserID:    userID,
		ExpiresAt: expiresAt,
	}

	result := s.db.Create(&refreshToken)
	if result.Error != nil {
		return "", expiresAt, result.Error
	}

	return token, expiresAt, nil
}
