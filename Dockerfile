# Etapa 1 - build
FROM node:18 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production

# Etapa 2 - servidor nginx
FROM nginx:alpine

COPY --from=build /app/dist/seu-projeto /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
