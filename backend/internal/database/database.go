package database

import (
	"fmt"
	"hackathon-project/internal/models"
	"hackathon-project/internal/seed"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/joho/godotenv/autoload"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	dbname   = os.Getenv("BLUEPRINT_DB_DATABASE")
	password = os.Getenv("BLUEPRINT_DB_PASSWORD")
	username = os.Getenv("BLUEPRINT_DB_USERNAME")
	port     = os.Getenv("BLUEPRINT_DB_PORT")
	host     = os.Getenv("BLUEPRINT_DB_HOST")
	DB       *gorm.DB
)

func New() *gorm.DB {
	// Reuse Connection
	if DB != nil {
		return DB
	}

	// Opening a driver typically will not attempt to connect to the database.
	db, err := gorm.Open(mysql.Open(fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", username, password, host, port, dbname)))
	if err != nil {
		// This will not be a connection error, but a DSN parse error or
		// another initialization error.
		log.Fatal(err)
	}

	DB = db

	fmt.Println("Migrating models")
	err = db.AutoMigrate(&models.Task{}, &models.TaskType{}, &models.User{}, &models.Session{}, &models.UserForm{})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Seeding Task Types")
	if err := DB.Save(&seed.TaskTypes).Error; err != nil {
		log.Fatal(err)
	}

	fmt.Println("Seeding Users")
	if err := DB.Save(&seed.Users).Error; err != nil {
		log.Fatal(err)
	}

	return db
}
