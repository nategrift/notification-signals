#!/bin/bash

cd server

echo "hello"

cat "hey"

npm install --only=prod

node migration.js up

pm2 restart notification-signals

exit