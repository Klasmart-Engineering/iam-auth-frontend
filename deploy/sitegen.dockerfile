# syntax = docker/dockerfile:experimental

# Concept - use this image to dynamically build the site on startup,
# so that environment-specific URLs can be supported at runtime without rebuilding images.

# The intention is to run this container as a sidecar to nginx:alpine
# with /usr/src/app/dist bind mounted to /usr/share/nginx/html via 
# shared volume or PVC.

# `webpack.prod.config.js` can be bind-mounted at runtime to include the correct
# configuration from a configmap etc.

# To build the image:
# eval `ssh-agent`
# ssh-add ~/.ssh/id_kidsloop
# docker build --ssh default -t auth -f deploy/sitegen.dockerfile .

FROM node:lts AS build
RUN apt update
RUN apt install libpng-dev
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan bitbucket.org >> ~/.ssh/known_hosts
WORKDIR /usr/src/app
COPY tsconfig.json .
COPY babel.config.js .
COPY index.html .
COPY deploy/webpack.prod.config.js .
COPY ./package.json .
COPY ./package-lock.json .

RUN --mount=type=ssh npm ci && npm audit fix
COPY assets assets
COPY src src

# These are container defaults, but can be overriden at deploy time.
ENV API_ENDPOINT="https://api.kidsloop.in/"
ENV AUTH_ENDPOINT="https://auth.kidsloop.in/"
ENV REDIRECT_LINK="https://hub.kidsloop.in/"
ENV ACCOUNT_ENDPOINT_BADANAMU="https://ams-account.badanamu.net"
ENV AUTH_ENDPOINT_BADANAMU="https://ams-auth.badanamu.net"
ENV SLD="kidsloop"
ENV TLD="in"

# Which of these is required?
RUN ./node_modules/.bin/webpack --config webpack.prod.config.js
RUN npm run build:prod

COPY deploy/init.sh /usr/src/app/deploy.sh
RUN chmod a+x /usr/src/app/deploy.sh
ENTRYPOINT ["/bin/bash", "/usr/src/app/deploy.sh" ]
