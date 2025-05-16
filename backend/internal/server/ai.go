package server

import (
	"errors"
	"fmt"
	"hackathon-project/internal/models"
	"os"

	"github.com/gin-gonic/gin"
	"google.golang.org/genai"
)

type AIContext struct {
	FormAnswers map[string]string
	Tasks       *[]models.Task
	Formatting  string // Context for what the ai will return
	Message     string
}

var (
	API_KEY    = os.Getenv("GEMINI_API_KEY")
	MAX_TOKENS = 10000
	BasePrompt = "Generate me a task list for the following day according to this information '%s'"
)

func CreateNewAIContext(answers map[string]string, tasks *[]models.Task, formatting string) *AIContext {
	return &AIContext{
		FormAnswers: answers,
		Tasks:       tasks,
		Formatting:  formatting,
	}
}

func CreateNewClient(key string, c *gin.Context) (*genai.Client, error) {
	return genai.NewClient(c, &genai.ClientConfig{
		APIKey:  API_KEY,
		Backend: genai.BackendGeminiAPI,
	})
}

func (aiCtx *AIContext) CreateMsg() *AIContext {
	for name, ans := range aiCtx.FormAnswers {
		aiCtx.Message += fmt.Sprintf("%s: %s\n", name, ans)
	}
	return aiCtx
}

func (aiCtx *AIContext) WithFormatting() *AIContext {
	aiCtx.Message = fmt.Sprintf("\n%s\n%s", aiCtx.Message, aiCtx.Formatting)
	return aiCtx
}

func (aiCtx *AIContext) WithTasks() *AIContext {
	for i, task := range *aiCtx.Tasks {
		aiCtx.Message += fmt.Sprintf("\n%d. Task: %s, completed: %v, type: %s", i+1, task.Title, task.Completed, task.Type)
	}
	return aiCtx
}

func (aiCtx *AIContext) RunPrompt(c *gin.Context) (string, error) {
	client, err := CreateNewClient(API_KEY, c)
	if err != nil {
		return "", errors.New("failed to create api client")
	}

	res, err := client.Models.GenerateContent(c, "gemini-2.0-flash", genai.Text(aiCtx.Message), &genai.GenerateContentConfig{
		MaxOutputTokens: int32(MAX_TOKENS),
	})
	if err != nil {
		return "", errors.New("failed to create response")
	}

	return res.Text(), nil
}
