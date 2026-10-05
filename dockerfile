# --- Estágio 1: Base ---
FROM node:24-alpine AS base
WORKDIR /app
RUN apk --no-cache add dumb-init python3 make g++

# --- Estágio 2: Instalação de dependências ---
FROM base AS dependencies
COPY package*.json ./
RUN npm ci

# --- Estágio 3: Build da aplicação ---
FROM dependencies AS build
COPY . .
RUN node ace build --ignore-ts-errors

# --- Estágio 4: Imagem de Produção Final ---
FROM base AS production
ENV NODE_ENV=production
ENV PORT=3333
ENV HOST=0.0.0.0

COPY package*.json ./
RUN npm ci --omit=dev

# Copia os arquivos compilados do estágio de build
COPY --from=build /app/build /app/build

EXPOSE 3333
CMD ["dumb-init", "node", "build/bin/server.js"]