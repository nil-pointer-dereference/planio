package server

import (
	"errors"
	"github.com/google/uuid"
	"hackathon-project/internal/database"
	"hackathon-project/internal/models"
)

func v5UUID(data string) string {
	return uuid.NewSHA1(uuid.NameSpaceURL, []byte(data)).String()
}

func GetAuthenticated(sessionId string) (models.User, error) {
	session := models.Session{}
	user := models.User{}
	if err := database.DB.Where("session_id = ?", sessionId).First(&session).Error; err != nil {
		return user, errors.New("session not found")
	}
	if err := database.DB.Where("id = ?", session.UserId).First(&user).Error; err != nil {
		return user, errors.New("user not found")
	}
	return user, nil
}

func CreateAuthenticated(user models.User) (models.Session, error) {
	session := models.Session{
		UserId:    user.Id,
		SessionId: GetAuthenticationToken(user.Username),
	}
	if err := database.DB.Where("user_id = ?", user.Id).First(&models.Session{}).Error; err != nil {
		if err := database.DB.Create(&session).Error; err != nil {
			return session, err
		}
		return session, err
	}
	return session, nil
}

func GetAuthenticationToken(username string) string {
	return v5UUID(username)
}
