#!/bin/bash

cd server

npm install --only=prod

node migration.js up

pm2 restart notification-signals

exit