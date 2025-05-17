package models

type Task struct {
	ID               int
	UserID           uint
	Type             string
	Completed        bool
	Title            string
	EstimatedMinutes int
	Priority         int
	Summary          string `gorm:"nullable"`
	Rating           int    `gorm:"nullable"`
}

type TaskType struct {
	Id   int `gorm:"primary_key;AUTO_INCREMENT"`
	Type string
}
