FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

ENTRYPOINT [ "node", "index.js" ]