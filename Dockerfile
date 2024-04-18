# Sử dụng image Node.js
FROM node:14 as build-stage

# Set working directory
WORKDIR /app

# Copy mã nguồn vào container
COPY . .

# Cài đặt dependencies
RUN npm install

# Build ứng dụng Vue
RUN npm run build

# Cấu hình web server để phục vụ ứng dụng Vue
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
