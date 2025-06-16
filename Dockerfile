FROM node:22-alpine

RUN apk update && apk upgrade && apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force && npm ci

COPY . .

RUN npx prisma generate