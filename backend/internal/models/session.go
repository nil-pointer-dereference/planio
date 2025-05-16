package models

type Session struct {
	Id        int    `gorm:"primary_key;AUTO_INCREMENT"`
	UserId    int    `gorm:"not null"`
	SessionId string `gorm:"not null"`
}
