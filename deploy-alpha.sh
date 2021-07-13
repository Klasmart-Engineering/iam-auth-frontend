#!/usr/bin/env bash
git submodule update --init --recursive --force

npm ci --no-progress

API_ENDPOINT="https://api.alpha.kidsloop.net/" \
AUTH_ENDPOINT="https://auth.alpha.kidsloop.net/" \
REDIRECT_LINK="https://hub.alpha.kidsloop.net/" \
SLD="kidsloop" \
TLD="net" \
npm run build:alpha

# install deps for deps
pushd src/pages/account/kidsloop-pass-frontend/client
npm ci --no-progress
npm run build:kl-alpha
popd

# bundle deps build and main build
mv src/pages/account/kidsloop-pass-frontend/client/dist ./dist/account

aws s3 sync dist s3://kidsloop-alpha-auth-rested-mackerel/alpha/latest
aws cloudfront create-invalidation --paths "/*" --distribution-id ELJUEQIM62ZJZ #auth.alpha.kidsloop.net
