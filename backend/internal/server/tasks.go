package server

import (
	"hackathon-project/internal/database"
	"hackathon-project/internal/models"
	"strings"

	"net/http"

	"github.com/gin-gonic/gin"
)

type TaskCreateRequest struct {
	Title            string `json: "title"`
	Type             string `json: "type"`
	Priority         int    `json: "priority"`
	EstimatedMinutes int    `json: "estimatedMinutes"`
}

type TaskSummarizeRequest struct {
	ID      int    `json: "id" binding:"required"`
	Summary string `json: "summary"`
	Rating  int    `json: "rating" binding:"required"`
}

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

func HandlerCreateTask(c *gin.Context) {
	var req TaskCreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	task := models.Task{
		Title:            req.Title,
		Type:             req.Type,
		Priority:         req.Priority,
		EstimatedMinutes: req.EstimatedMinutes,
	}
	if err := database.DB.Create(&task).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}
	c.JSON(200, req)
}

func HandlerSummarizeTask(c *gin.Context) {
	userFromSession, err := GetAuthenticated(c.GetHeader("Session"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	var req TaskSummarizeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	if req.Rating <= 0 || req.ID == 0 {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	task := &models.Task{}
	if err := database.DB.Where("id = ?", req.ID).Find(&task).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}
	database.DB.Model(&task).Update("summary", req.Summary)
	database.DB.Model(&task).Update("rating", req.Rating)
	database.DB.Model(&task).Update("Completed", true)

	aiCtx := CreateNewAIContext(
		map[string]string{
			"Name":             userFromSession.Name,
			"Age":              userFromSession.Birthday,
			"Task information": task.Summary,
			"Task type":        task.Type,
			"Task title, name": task.Title,
			"User's rating of the task of how it went:":   string(rune(req.Rating)),
			"User's summary of the task and how it went:": req.Summary,
		},
		&[]models.Task{},
		"Say a simple, up-keeping and heart-warming message depending on the context of the task."+
			"A user is telling you about a situation and how the task went."+
			"Keep it maximum to 4 sentences. Be very kind and if something went wrong, offer a short solution or change."+
			"Keeping the original values. Do not use any formatting or markdown. Print only a raw text."+
			"Maybe you could use an emoji. Napisz to po polsku.",
	)

	raw, err := aiCtx.CreateMsg().WithFormatting().WithTasks().RunPrompt(c)
	if err != nil {
		c.AbortWithStatus(400)
		return
	}
	c.JSON(200, gin.H{"message": strings.Replace(raw, "\n", "", -1)})
}
