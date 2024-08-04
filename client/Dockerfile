FROM node:18-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --silent
COPY . ./
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/.next /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]