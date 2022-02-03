# Hub frontend factory image build file.
# Due to limitations in bitbucket pipelines (2022 and still no buildkit???)
# the first part of the build is done in bitbucket and then copied into the container.

# Build commands
FROM node:14-bullseye

RUN apt-get update -y && apt-get install --no-install-recommends -y jq git autoconf automake g++ libpng-dev make optipng

# Copy the package.json file and run `npm ci` before copying source to benefit from docker cache
COPY . /src
WORKDIR /src
RUN mkdir -p ~/.ssh && touch ~/.ssh/known_hosts && ssh-keyscan -H bitbucket.org >> ~/.ssh/known_hosts

# First recurse into the kidsloop-pass submodule and install dependencies, then install for base project
ARG SSH_PRIVATE_KEY_BITBUCKET_B64
RUN eval `ssh-agent` && \
    echo "$SSH_PRIVATE_KEY_BITBUCKET_B64" | base64 -d | ssh-add - && \
    ssh-add -l && \
    cd /src/src/pages/account/kidsloop-pass-frontend/client && \
    # git init && \
    npm i && \
    cd /src && \
    npm i
# ENV PATH="$PATH:/src/node_modules/.bin"
RUN touch .env.null

# Default ENVs
# Kidsloop Pass variables
ENV AUTH_RETURN_LINK=https://auth.kidsloop.live/
ENV BRAND=KIDSLOOP

# Auth frontend vars
ENV API_ENDPOINT=https://api.kidsloop.live/
ENV AUTH_ENDPOINT=https://auth.kidsloop.live/
ENV HUB_ENDPOINT=https://hub.kidsloop.live/
ENV AUTH_ENDPOINT_BADANAMU=https://ams-auth.badanamu.net
ENV SLD=kidsloop
ENV TLD=live
ENV DEFAULT_LANGUAGE=en

ENV NODE_ENV=production
ENV ENV_PATH=/src/.env.null

LABEL component="auth-frontend-web-factory"
LABEL maintainer="sre@kidsloop.live"
LABEL description="This component is used for building the auth frontend, including kidsloop pass component."

ENTRYPOINT ["/bin/bash", "-c"]
CMD ["cd /src/src/pages/account/kidsloop-pass-frontend/client && npm run build:prod && cd /src && npm run build"]

# Copy the code + version stamp
COPY . /src
RUN Version="$(git describe --tags)" Tag="$(git rev-parse --short HEAD)"; jq --arg version "$Version" --arg tag "$Tag" "{\"Version\":\"$Version\",\"Commit\":\"$Tag\"}" --raw-output --null-input > /src/version.txt
