# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from /frontend
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from /frontend
COPY frontend ./

# Set environment variable
ENV VITE_REACT_APP_BACKEND_URL=http://localhost:8000

# Build the frontend
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]