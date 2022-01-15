# Notification Signals

Notification API that allows people to send requests to an API that then sends a message to a platform they specify.

## Goal

Goal of this project is to learn the following goals. In addition, I hope to use this API service for my small projects to be able to send notifications to my phone. For example, when someone connects to a chat room on fanci.ca or yt.nategrift.com.

- Explore Two Factor Auth
- Explore Notifications on Platforms
    - Discord
    - Slack
    - IOS?
    - Android?
    - SMS? (*Future possibility using another service but would need paid plans first as it is more pricy*)
- Explore statistics and tracking how many records
- Explore API keys and better security
- Explore JWT tokens (*Half complete, needs some serious work*)

## Steps to install

1. git clone repository
##### Server Setup
2. run `npm install`
3. copy `sample.env` to new file called `.env`
4. fill out `.env` file (or get development env file from @nategrift)
5. Create a database in your mysql server called `notification-signals`.
5. run `node migration.js up`
6. run `npm run dev`

##### Client Setup
Needs to be filled out when client is created.
