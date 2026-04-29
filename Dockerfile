# Build stage
FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --configuration production

# Runtime stage (Nginx)
FROM nginx:alpine

COPY --from=build /app/dist/vetapp-front /usr/share/nginx/html

# Angular routing fix
COPY nginx.conf /etc/nginx/conf.d/default.conf