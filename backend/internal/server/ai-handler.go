package server

import (
	"encoding/json"
	"hackathon-project/internal/database"
	"hackathon-project/internal/models"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func HandlerPostAI(c *gin.Context) {
	userFromSession, err := GetAuthenticated(c.GetHeader("Session"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	userForm := models.UserForm{}
	if err = database.DB.Where("user_id = ?", userFromSession.Id).First(&userForm).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	aiCtx := CreateNewAIContext(
		map[string]string{
			"Name":                      userFromSession.Name,
			"Age":                       userFromSession.Birthday,
			"Interests":                 userForm.Interests,
			"Goes to work?":             strconv.FormatBool(userForm.DoesWork),
			"Goals":                     userForm.Goals,
			"Free time activities":      userForm.FreeTimeActivites,
			"Ways to rest":              userForm.Rest,
			"Ways for entertain":        userForm.Rest,
			"Level of stress 1-5:":      string(userForm.LevelOfStress),
			"Intensive days 1-5:":       string(userForm.DayIntensiveness),
			"Experience in sports 1-5:": string(userForm.SportsExperience),
			"Mandatory wake up time:":   userForm.WakeUpTime,
			"Sleep hours":               string(userForm.SleepHours),
		},
		&[]models.Task{}, // empty notes
		"raw generated tasks in json, do not wrap the json codes in JSON markdown markers. do not append any data from me."+
			"You have 24 hour day. You have user data. task format: Type string, Completed bool, Title (max 4 words) string, Description (max 2 sentences) string EstimatedMinutes int."+
			"if you consider sports, mind Experience in sports. Tasks should have start hour and mind their estimatedminutes."+
			"You can adjust sleep time +/- 1 hour."+
			"Only one sleep session. Think about it as when to go to sleep and start other tasks after the sleep task period."+
			"Do not add commute time, add a little bit to task duration which needs commuting.",
	)

	raw, err := aiCtx.CreateMsg().WithFormatting().WithTasks().RunPrompt(c)
	if err == nil {
		var data any
		cleanStr := strings.TrimPrefix(raw, "```json")
		cleanStr = strings.TrimSuffix(cleanStr, "```")

		err := json.Unmarshal([]byte(cleanStr), &data)
		if err != nil {
			c.JSON(400, gin.H{"data": data, "raw": cleanStr, "error": err})
			return
		}

		c.JSON(200, data)
		return
	}

	c.AbortWithStatus(400)
}
