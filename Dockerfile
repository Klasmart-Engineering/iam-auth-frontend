# syntax = docker/dockerfile:experimental
FROM node:lts AS build
RUN apt update
RUN apt install libpng-dev
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan bitbucket.org >> ~/.ssh/known_hosts
WORKDIR /usr/src/app
COPY tsconfig.json .
COPY babel.config.js .
COPY index.html .
COPY webpack.config.ts .
# COPY webpack.prod.js .
COPY ./package.json .
COPY ./package-lock.json .
RUN --mount=type=ssh npm i
COPY assets assets
COPY src src
RUN ./node_modules/.bin/webpack --config webpack.config.ts

FROM nginx:alpine AS release
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html