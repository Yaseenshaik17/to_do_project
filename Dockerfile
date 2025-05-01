# Simple single-stage Dockerfile for static files
FROM nginx:alpine

# Copy all files to Nginx's web root
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]