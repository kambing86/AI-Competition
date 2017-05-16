FROM node:7.10-alpine
WORKDIR /subscribeDemo
COPY package.json yarn.lock ./
RUN ["yarn"]
COPY . .
CMD ["node", "index.js"]