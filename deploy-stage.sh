#!/usr/bin/env bash
git submodule update --init --recursive --force

npm ci --no-progress
npm audit fix

API_ENDPOINT="https://api.kidsloop.net/" \
AUTH_ENDPOINT="https://auth.kidsloop.net/" \
REDIRECT_LINK="https://hub.kidsloop.net/" \
ACCOUNT_ENDPOINT_BADANAMU="https://ams-account.badanamu.net" \
AUTH_ENDPOINT_BADANAMU="https://ams-auth.badanamu.net" \
SLD="kidsloop" \
TLD="net" \
npm run build:prod

# install deps for deps
pushd src/pages/account/kidsloop-pass-frontend/client
npm ci --no-progress
npm audit fix
npm run build:prod
popd

# bundle deps build and main build
mv src/pages/account/kidsloop-pass-frontend/client/dist ./dist/account

aws s3 sync dist s3://auth.kidsloop.net/stage --dryrun
sleep 5
aws s3 sync dist s3://auth.kidsloop.net/stage
aws cloudfront create-invalidation --paths "/stage*" --distribution-id E134FIUH68FUOQ #auth.kidsloop.net
