package migrations

import (
	"hackathon-project/internal/database"
	"hackathon-project/internal/models"
	"log"
)

func MigrateAll() {
	log.Fatal(database.DB.AutoMigrate(&models.Task{}, &models.TaskType{}))
}
