# ================================
# Stage 1: Build the React app
# ================================
FROM node:18 as frontend-build

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
ENV VITE_REACT_APP_BACKEND_URL=http://localhost:8000
RUN npm run build

# ================================
# Stage 2: Final image with Nginx, Python, and FastAPI
# ================================
FROM python:3.11-slim

# Install Nginx and any needed system packages
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy backend code & install Python deps
WORKDIR /app
COPY backend/ /app/backend/
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy frontend build output to Nginx
COPY --from=frontend-build /app/dist /usr/share/nginx/html

# Copy a simple startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Environment variables for your FastAPI app
ENV SECRET=some_secret_key
ENV DATABASE_URL=postgresql+asyncpg://postgres:password@db:5432/mydb

# Expose both 80 (Nginx) and 8000 (FastAPI)
EXPOSE 80
EXPOSE 8000

CMD ["/app/start.sh"]