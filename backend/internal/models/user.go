package models

import "gorm.io/datatypes"

type User struct {
	Id       int            `gorm:"primary_key;AUTO_INCREMENT"`
	Name     string         `gorm:"not null"`
	Birthday datatypes.Date `gorm:"not null,datetime"`
	About    string         `gorm:"not null"`
}
