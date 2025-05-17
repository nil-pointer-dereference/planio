package server

import (
	"encoding/json"
	"fmt"
	"hackathon-project/internal/database"
	"hackathon-project/internal/models"
	"net/http"
	"strconv"
	"strings"
	"time"

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
	var taskTypes []models.TaskType
	response := database.DB.Find(&taskTypes)
	if response.Error != nil {
		fmt.Println("Continuing on empty taskTypes context: " + response.Error.Error())
	}
	jsonTypes, _ := json.Marshal(taskTypes)
	fmt.Println(string(jsonTypes))

	var tasks []models.Task
	response = database.DB.Find(&tasks)
	if response.Error != nil {
		fmt.Println("Continuing on empty tasks: " + response.Error.Error())
	}
	jsonTasks, _ := json.Marshal(tasks)
	fmt.Println(string(jsonTasks))

	aiCtx := CreateNewAIContext(
		map[string]string{
			"Name":                         userFromSession.Name,
			"Age":                          userFromSession.Birthday,
			"Interests":                    userForm.Interests,
			"Goes to work?":                strconv.FormatBool(userForm.DoesWork),
			"Goals":                        userForm.Goals,
			"Free time activities":         userForm.FreeTimeActivites,
			"Ways to rest":                 userForm.Rest,
			"Ways for entertain":           userForm.Entertainment,
			"Level of stress 1-5:":         string(userForm.LevelOfStress),
			"Intensive days 1-5:":          string(userForm.DayIntensiveness),
			"Experience in sports 1-5:":    string(userForm.SportsExperience),
			"Mandatory wake up time:":      userForm.WakeUpTime,
			"Sleep hours":                  string(userForm.SleepHours),
			"Only Task categories to use:": string(jsonTypes),
			"Previous tasks and their summaries to learn:": string(jsonTasks),
			"Work shift time:": userForm.WorkTime,
		},
		&[]models.Task{}, // empty notes
		"raw generated tasks in json, do not wrap the json codes in JSON markdown markers. do not append any data from me."+
			"You have 24 hour day. You have user data. task format: Type string, Completed bool, Title (max 4 words) string, Description (max 2 sentences) string"+
			"EstimatedMinutes int means how long the task should take in minutes."+
			"Start hour can be any :10, :15, :20, :25, :30, etc."+
			"Do also startDate and endDate of format dd-MM-YYYY-HH:mm:ss"+
			"if you consider sports, mind Experience in sports. Tasks should have start hour and mind their estimatedminutes."+
			"You can adjust sleep time +/- 1 hour. If you do, tell it in the description of sleep."+
			"Only one sleep session. Think about it as when to go to sleep and start other tasks after the sleep task period."+
			"Do not add commute time, add a little bit to task duration which needs commuting."+
			"Focus on task summaries if they exist."+
			"No tasks should overlap. Meaning that start hour + estimated minutes sum should not overflow on other task's start hour + estimated minutes, too."+
			"Work shift time should always be in the same time, no matter what. Meaning that task of Type 'Work' can be only one within the designated hours and no more."+
			"Do not mention any medication or things that do not require doctor's diagnosis."+
			"Try to make tasks lightweight."+
			"Must keep at least 10 minute breaks between all tasks."+
			"Tasks have their priority - priority 5 means it has to be included and can not be ommited."+
			"Tasks with 0 priority could be skipped but don't need to."+
			"If a user in tasks' summary says something bad about the given task, maybe consider lowering its occurrence times."+
			"Work (as in job) tasks can only be considered if 'goes to work' is true. Otherwise, the human does not go to work."+
			"Napisz to wszystko po polsku",
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

type SaveTask struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Type        string    `json:"type"`
	Start       time.Time `json:"start"`
	End         time.Time `json:"end"`
	Completed   bool      `json:"completed"`
}

func HandleSaveTasks(c *gin.Context) {
	var savetasks []SaveTask
	userFromSession, err := GetAuthenticated(c.GetHeader("Session"))
	err = c.ShouldBindJSON(&savetasks)
	if err != nil {
		c.AbortWithStatus(400)
	}
	//type Task struct {
	//	ID               int
	//	UserID           uint
	//	Type             string
	//	Completed        bool
	//	Title            string
	//	EstimatedMinutes int
	//	Priority         int
	//	Summary          string `gorm:"nullable"`
	//	Rating           int    `gorm:"nullable"`
	//}
	var tasks []models.Task
	for _, savetask := range savetasks {
		tasks = append(tasks, models.Task{
			ID:               savetask.ID,
			Title:            savetask.Title,
			UserID:           uint(userFromSession.Id),
			Type:             savetask.Type,
			Completed:        savetask.Completed,
			EstimatedMinutes: int(savetask.End.Sub(savetask.Start).Minutes()),
			Priority:         3,
			Summary:          "",
			Rating:           0,
		})
	}
	database.DB.Save(&tasks)
	c.JSON(200, tasks)
}
