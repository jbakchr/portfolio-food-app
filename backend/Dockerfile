FROM node:alpine

COPY package*.json ./
RUN apk add --no-cache bash && npm install
COPY . .

EXPOSE 5000

CMD ["npm", "start"]