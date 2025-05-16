package models

type User struct {
	Id       int    `gorm:"primary_key;AUTO_INCREMENT"`
	Username string `gorm:"not null"`
	Password string `gorm:"not null"`
	Name     string `gorm:"not null"`
	Birthday string `gorm:"not null"`
}
