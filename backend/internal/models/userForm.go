package models

type UserForm struct {
	id                int `gorm:"primaryKey"`
	UserId            int `gorm:"not null"`
	User              User
	Interests         string
	DoesWork          bool
	Goals             string
	FreeTimeActivites string
	Rest              string
	Entertainment     string
	LevelOfStress     uint8
	DayIntensiveness  uint8
}
