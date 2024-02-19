package auth

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/nategrift/notification-signals/pkg/model"
)

type CustomClaims struct {
	UserID uint `json:"user_id"`
	jwt.StandardClaims
}

var JWTKey = []byte("your_secret_key")

func GenerateJWT(user *model.User) (string, time.Time, error) {
	expirationTime := time.Now().Add(15 * time.Minute)
	claims := &CustomClaims{
		UserID: user.ID,
		StandardClaims: jwt.StandardClaims{
			Subject:   user.Username,
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(JWTKey)
	if err != nil {
		return "", time.Time{}, err
	}

	return tokenString, expirationTime, nil
}
