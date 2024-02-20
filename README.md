# Notification Signals

Notification API that allows people to send requests to an API that then sends a message to a platform they specify.

## Goal

Goal of this project is to explore more about the Go language. In addition, I hope to use this API service for my small projects to be able to send notifications to my phone. For example, when someone connects to fanci.nategrift.com or getting breakdowns of visits for my portfolio

- Explore Notifications on Platforms
    - Discord
    - Slack?
    - IOS?
    - Android?
    - SMS? (*Future possibility using another service but would need paid plans first as it is more pricy*)
- Explore statistics and tracking how many records
- Explore API keys and better security
- Explore JWT tokens

## Technologies used

- [Golang](https://go.dev) - API and Micro-services are all written in Go
- [Gin Web Framework](https://gin-gonic.com/) - Gin Web Framework used for primary API
- [PostgreSQL](https://www.postgresql.org/) - Database of choice to house all of our data
- [Docker](https://www.docker.com/) - Used for development environment to have a local database easily
- [gRPC](https://grpc.io/) - Used for communication between Micro-Services and the API
