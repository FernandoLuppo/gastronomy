FROM node:18-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . ./

RUN yarn build

EXPOSE 3001

CMD ["yarn", "start"]
