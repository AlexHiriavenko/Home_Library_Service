FROM node:22-alpine 


WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && npm ci 

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 4000
