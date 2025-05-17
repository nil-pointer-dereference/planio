package seed

import "hackathon-project/internal/models"

var Users = []models.User{
	{Id: 1, Username: "alice123", Password: "password1", Name: "Alice Johnson", Birthday: "1990-05-15"},
	{Id: 2, Username: "bob_smith", Password: "secretpass", Name: "Bob Smith", Birthday: "1985-10-30"},
	{Id: 3, Username: "charlie77", Password: "mypassword", Name: "Charlie Brown", Birthday: "1992-12-01"},
	{Id: 4, Username: "diana.k", Password: "diana1234", Name: "Diana King", Birthday: "1988-07-22"},
	{Id: 5, Username: "eric_w", Password: "ericpass", Name: "Eric White", Birthday: "1995-03-10"},
	{Id: 6, Username: "test", Password: "123", Name: "Giga Sigma", Birthday: "1992-01-12"},
}
