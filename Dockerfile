FROM node:18-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY . /app
WORKDIR /app

RUN npm i

CMD ["npm", "start"]
