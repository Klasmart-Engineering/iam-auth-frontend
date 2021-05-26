#!/usr/bin/env bash
git submodule update --init --recursive --force
npm i
npm audit fix
API_ENDPOINT="https://api-prod.kidsloop.in/" \
AUTH_ENDPOINT="https://auth-prod.alpha.kidsloop.in/" \
REDIRECT_LINK="https://hub-prod.alpha.kidsloop.in/" \
SLD="kidsloop" \
TLD="in" \
npm run build:prod:in