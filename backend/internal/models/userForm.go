package models

type UserForm struct {
	id                int    `gorm:"primaryKey" json:"-"`
	UserId            int    `gorm:"not null"  json:"-"`
	User              User   `json:"-"`
	Interests         string `json:"interests"`
	DoesWork          bool   `json:"doesWork"`
	Goals             string `json:"goals"`
	FreeTimeActivites string `json:"freeTimeActivites"`
	Rest              string `json:"rest"`
	Entertainment     string `json:"entertainment"`
	LevelOfStress     uint8  `json:"levelOfStress"`
	DayIntensiveness  uint8  `json:"dayIntensiveness"`
}
