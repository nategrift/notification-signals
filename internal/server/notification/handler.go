package notification

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	pb "github.com/nategrift/notification-signals/pkg/common/protobuf"
	"google.golang.org/grpc"
)

type Handler struct {
}

func NewHandler() *Handler {
	return &Handler{}
}

type NotificationRequest struct {
	Title         string `json:"title"`
	Message       string `json:"message"`
	DestinationId string `json:"destinationId"`
}

func (h *Handler) SendNotification(c *gin.Context) {
	var req NotificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	client := pb.NewNotificationServiceClient(conn)

	// Prepare and send the gRPC request
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := client.Send(ctx, &pb.NotificationRequest{
		Title:         req.Title,
		Message:       req.Message,
		DestinationId: req.DestinationId,
	})
	if err != nil {
		log.Fatalf("could not send notification: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send notification"})
		return
	}

	log.Printf("Notification sent: %v", r.GetSuccess())
	c.JSON(http.StatusOK, gin.H{"message": "Notification Sent"})
}
