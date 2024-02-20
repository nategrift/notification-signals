package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"

	"github.com/bwmarrin/discordgo"
	"github.com/joho/godotenv"
	pb "github.com/nategrift/notification-signals/pkg/common/protobuf"
	"google.golang.org/grpc"
)

type grpcServer struct {
	pb.UnimplementedNotificationServiceServer
	discordSession *discordgo.Session
}

func (s *grpcServer) Send(ctx context.Context, in *pb.NotificationRequest) (*pb.NotificationResponse, error) {
	log.Printf("Received notification request: %v", in)

	sendMessageToDiscord(s.discordSession, in.DestinationId, in.Title+": "+in.Message)

	return &pb.NotificationResponse{Success: true}, nil
}

func sendMessageToDiscord(s *discordgo.Session, channelID string, message string) {
	_, err := s.ChannelMessageSend(channelID, message)
	if err != nil {
		log.Printf("Error sending message to Discord: %v", err)
	} else {
		fmt.Println("Message sent to Discord successfully")
	}
}

func StartGRPCServer(discordSession *discordgo.Session) {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterNotificationServiceServer(s, &grpcServer{discordSession: discordSession})
	log.Printf("gRPC server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

func main() {
	// get config
	err := godotenv.Load(".env.dev", ".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	token := "Bot " + os.Getenv("DISCORD_TOKEN")
	if token == "" {
		log.Fatal("No DISCORD_TOKEN found in environment")
	}

	// Initialize Discord Bot
	dg, err := discordgo.New(token)
	if err != nil {
		log.Fatalf("Error initializing Discord bot: %v", err)
	}

	err = dg.Open()
	if err != nil {
		log.Fatalf("Error opening connection to Discord: %v", err)
	}
	defer dg.Close()

	// initialize gRPC server
	StartGRPCServer(dg)

}
