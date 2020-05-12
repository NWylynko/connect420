FROM node:14-alpine
WORKDIR /var/www/c420
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build