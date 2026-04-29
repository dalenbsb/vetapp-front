# Build da aplicação Angular
FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production

# Servidor web (nginx)
FROM nginx:alpine

# Copia o build correto
COPY --from=build /app/dist/vetapp-front/browser /usr/share/nginx/html

# Configuração para Angular (rotas)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]