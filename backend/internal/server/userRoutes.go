package server

import (
	"fmt"
	"hackathon-project/internal/database"
	"hackathon-project/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
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
	auth, _ := CreateAuthenticated(user)
	c.JSON(http.StatusOK, gin.H{
		"sessionId": auth.SessionId,
		"username":  user.Username,
	})
}

func HandlerCheckIfSession(c *gin.Context) {
	fmt.Println("Got key: " + c.GetHeader("Session"))
	user, err := GetAuthenticated(c.GetHeader("Session"))
	if err == nil {
		c.JSON(http.StatusOK, user)
		return
	}
	c.JSON(http.StatusNotFound, err)
}

func HandlerGetFormData(c *gin.Context) {
	u, err := GetAuthenticated(c.GetHeader("Session"))
	if err != nil {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	var data models.UserForm
	if err := c.BindJSON(&data); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	data.UserId = u.Id

	if err = database.DB.Create(&data).Error; err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(200, gin.H{"body": data})
}
