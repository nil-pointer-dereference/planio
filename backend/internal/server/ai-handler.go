package server

import (
	"encoding/json"
	"hackathon-project/internal/models"
	"strings"

	"github.com/gin-gonic/gin"
)

func HandlerPostAI(c *gin.Context) {
	aiCtx := CreateNewAIContext(
		map[string]string{
			"Name":               "Szymon",
			"Age":                "23",
			"Goals":              "I want to become a better programmer and win this hackathon",
			"stress_levels":      "3/5",
			"activity_intensity": "2/5",
		},
		&[]models.Task{}, // empty notes
		"raw generated tasks in json, do not wrap the json codes in JSON markdown markers",
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
