package server

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"hackathon-project/internal/database"
	"hackathon-project/internal/models"
	"net/http"
)

type UserRegisterRequest struct {
	Username  string `json:"username"`
	Password  string `json:"password"`
	Name      string `json:"name"`
	Birthdate string `json:"birthdate"`
}

type UserLoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserLoginResponse struct {
	SessionId string `json:"sessionId"`
}

func HandlerUserRegister(c *gin.Context) {
	var req UserRegisterRequest
	if err := c.BindJSON(&req); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	user := models.User{
		Username: req.Username,
		Password: req.Password,
		Name:     req.Name,
		Birthday: req.Birthdate,
	}
	if database.DB.Where("username = ?", req.Username).First(&models.User{}).RowsAffected > 0 {
		c.AbortWithStatusJSON(http.StatusConflict, gin.H{
			"message": "User already exists.",
		})
		return
	}
	if err := database.DB.Create(&user).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
	}
	c.JSON(200, req)
}

func HandlerUserLogin(c *gin.Context) {
	var req UserLoginRequest
	if err := c.BindJSON(&req); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	username := req.Username
	password := req.Password
	var user models.User
	if err := database.DB.Where("username = ?", username).Where("password = ?", password).First(&user).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
			"message": "User not found.",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"sessionId:": v5UUID(user.Username),
	})
}

func v5UUID(data string) string {
	return uuid.NewSHA1(uuid.NameSpaceURL, []byte(data)).String()
}
