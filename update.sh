#!/bin/bash

time_start=`date +%s`


ssh -t vps '

cd notification-signals

git pull origin main

server/update.sh
'

time_end=`date +%s`
time_exec=`expr $(( $time_end - $time_start ))`

clear

echo "
***************************************

     Notification Signals Updated!

   Took $time_exec seconds to update

***************************************"

