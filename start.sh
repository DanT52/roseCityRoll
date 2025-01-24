#!/bin/sh

# Start the FastAPI backend (runs in background)
python /app/backend/main.py &

# Create a user in the database
python /app/backend/create_user_script.py

# Finally start Nginx (runs in foreground)
nginx -g "daemon off;"