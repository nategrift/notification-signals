package notification

import (
	"context"
	"errors"
	"log"
	"time"

	pb "github.com/nategrift/notification-signals/pkg/common/protobuf"
	"github.com/nategrift/notification-signals/pkg/server/model"
	"google.golang.org/grpc"
	"gorm.io/gorm"
)

type ApiKeyRetriever interface {
	GetApiKeyByKey(key string) (*model.ApiKey, error)
}

type LinkRetriever interface {
	GetAllLinksForApiKey(apiKeyID uint) ([]model.Link, error)
}

type Service struct {
	db              *gorm.DB
	ApiKeyRetriever ApiKeyRetriever
	LinkRetriever   LinkRetriever
}

func NewService(db *gorm.DB, ApiKeyRetriever ApiKeyRetriever, LinkRetriever LinkRetriever) *Service {
	return &Service{db, ApiKeyRetriever, LinkRetriever}
}

func (s *Service) SendNotification(req NotificationRequest, destinationID string) error {
	notifyPayload := pb.NotificationRequest{
		Title:         req.Title,
		Message:       req.Message,
		DestinationId: destinationID,
	}

	return s.SendDiscordNotification(notifyPayload)
}

func (s *Service) SendDiscordNotification(notifyPayload pb.NotificationRequest) error {
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	client := pb.NewNotificationServiceClient(conn)

	// Prepare and send the gRPC request
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := client.Send(ctx, &notifyPayload)

	if err != nil || r.GetSuccess() != true {
		return errors.New("failed to send notification")
	}

	return nil
}
