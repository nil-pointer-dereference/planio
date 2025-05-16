package server

import (
	"github.com/gin-gonic/gin"
	"hackathon-project/internal/database"
	"hackathon-project/internal/models"
	"net/http"
)

func HandlerGetTasks(c *gin.Context) {
	c.Status(200)
}

func HandlerGetAllTaskTypes(c *gin.Context) {
	var taskTypes []models.TaskType
	response := database.DB.Find(&taskTypes)
	if response.Error != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": response.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, taskTypes)
}
