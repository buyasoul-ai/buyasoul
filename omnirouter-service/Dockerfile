FROM node:22-alpine

WORKDIR /app

COPY omnirouter-service/package.json ./omnirouter-service/
COPY omnirouter-service/index.js ./omnirouter-service/
WORKDIR /app/omnirouter-service
RUN npm install --production

EXPOSE 20128

CMD ["node", "index.js"]
