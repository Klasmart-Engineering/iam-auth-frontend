#!/usr/bin/env bash
git submodule update --init --recursive --force

npm ci --no-progress

API_ENDPOINT="https://api.kidsloop.live/" \
AUTH_ENDPOINT="https://auth.kidsloop.live/" \
REDIRECT_LINK="https://hub.kidsloop.live/" \
ACCOUNT_ENDPOINT_BADANAMU="https://ams-account.badanamu.net" \
AUTH_ENDPOINT_BADANAMU="https://ams-auth.badanamu.net" \
SLD="kidsloop" \
TLD="live" \
npm run build:prod

# install deps for deps
pushd src/pages/account/kidsloop-pass-frontend/client
npm ci --no-progress
npm run build:prod
popd

# bundle deps build and main build
mv src/pages/account/kidsloop-pass-frontend/client/dist ./dist/account

aws s3 sync dist s3://klglobal-prod-auth/latest --dryrun
sleep 15
aws s3 sync s3://klglobal-prod-auth/ backup
aws s3 sync dist s3://klglobal-prod-auth/latest
aws cloudfront create-invalidation --paths "/*" --distribution-id E155GPCPCEB7UZ #auth.kidsloop.live
