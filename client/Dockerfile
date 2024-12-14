FROM node:18-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE 3001

CMD ["yarn", "dev"]
