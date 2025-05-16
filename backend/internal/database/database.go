package database

import (
	"fmt"
	"hackathon-project/internal/models"
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
	err = db.AutoMigrate(&models.Task{}, &models.TaskType{}, &models.User{})
	if err != nil {
		// This will not be a connection error, but a DSN parse error or
		// another initialization error.
		log.Fatal(err)
	}

	return db
}
