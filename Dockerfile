FROM node:22-alpine 

RUN apk update && apk upgrade openssl && apk add --no-cache openssl=3.3.2-r1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force && npm ci 

COPY . .

RUN npx prisma generate

