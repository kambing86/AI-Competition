#!/bin/sh
docker-compose down && docker-compose build && docker system prune -f && docker-compose up -d