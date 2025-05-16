package server

import "github.com/gin-gonic/gin"

func HandlerGetTasks(c *gin.Context) {
	c.Status(200)
}
