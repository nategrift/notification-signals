package auth

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/nategrift/notification-signals/pkg/model"
)

var jwtKey = []byte("your_secret_key") // Keep this key secret and consider it configurable

func GenerateJWT(user *model.User) (string, time.Time, error) {
	expirationTime := time.Now().Add(15 * time.Minute) // e.g., JWT expires in 15 minutes
	claims := &jwt.StandardClaims{
		Subject:   user.Username,
		ExpiresAt: expirationTime.Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey) // jwtKey is your secret
	if err != nil {
		return "", time.Time{}, err
	}

	return tokenString, expirationTime, nil
}
