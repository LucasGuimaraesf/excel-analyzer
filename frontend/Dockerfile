# ---- Etapa 1: build do frontend com Node ----
FROM node:20-alpine AS build

WORKDIR /app

# Instala dependências primeiro (cache de camadas)
COPY package*.json ./
RUN npm ci

# Copia o restante do código e gera o build de produção em /app/dist
COPY . .
RUN npm run build

# ---- Etapa 2: serve os arquivos estáticos com nginx ----
FROM nginx:alpine

# Configuração que serve o SPA e faz proxy de /api para o backend
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia apenas o resultado do build (imagem final fica leve)
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
