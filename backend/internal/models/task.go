package models

import "gorm.io/gorm"

type Task struct {
	gorm.Model

	UserID           uint
	Type             string
	Completed        bool
	Title            string
	EstimatedMinutes int
	Priority         int
}

type TaskType struct {
	Id   int `gorm:"primary_key;AUTO_INCREMENT"`
	Type string
}
