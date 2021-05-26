#!/usr/bin/env bash

# submodules
git submodule update --init --recursive --force
# npm installs
npm i --no-progress
npm audit fix

# config hack and package build
API_ENDPOINT="https://api-prod.kidsloop.in/" \
AUTH_ENDPOINT="https://auth-prod.alpha.kidsloop.in/" \
REDIRECT_LINK="https://hub-prod.alpha.kidsloop.in/" \
SLD="kidsloop" \
TLD="in" \
npm run build:prod-in

# s3 bucket sync
aws s3 sync dist s3://klindia-prod-auth/latest

# invalidate cache
aws cloudfront create-invalidation --paths "/*" --distribution-id E2DJ7W3VTT0CDT