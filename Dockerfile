# Build da aplicação Angular
FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production

# Servidor web (nginx)
FROM nginx:alpine

# Copia o build para o nginx
COPY --from=build /app/dist/vetapp-front /usr/share/nginx/html

# Configuração para Angular (rotas)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
