#! /bin/bash

echo 'Removing tagged images'
docker rmi gcr.io/twitter-helpdesk-server:1.0.0

echo 'Removing existing images'
docker rmi twitter-helpdesk-server:1.0.0

echo 'Creating new image for twitter-helpdesk-server'
docker build --tag twitter-helpdesk-server:1.0.0 . --platform linux/amd64