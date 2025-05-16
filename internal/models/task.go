package models

import "gorm.io/gorm"

type Task struct {
	gorm.Model

	UserID           uint
	Type             string
	Completed        bool
	Title            string
	EstimatedMinutes int
}

type TaskType struct {
	gorm.Model

	UserID uint `gorm:"nullable"`
	Type   string
}
