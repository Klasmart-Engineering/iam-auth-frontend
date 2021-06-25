#!/usr/bin/env bash
git submodule update --init --recursive --force

# install main js deps
npm ci --no-progress
# config hack and package build
API_ENDPOINT="https://api.kidsloop.in/" \
AUTH_ENDPOINT="https://auth.kidsloop.in/" \
REDIRECT_LINK="https://hub.kidsloop.in/" \
ACCOUNT_ENDPOINT_BADANAMU="https://ams-account.badanamu.net" \
AUTH_ENDPOINT_BADANAMU="https://ams-auth.badanamu.net" \
SLD="kidsloop" \
TLD="in" \
npm run build:prod

# install deps for deps
pushd src/pages/account/kidsloop-pass-frontend/client
npm ci --no-progress
npm run build:prod-in
popd

# bundle deps build and main build
mv src/pages/account/kidsloop-pass-frontend/client/dist ./dist/account

echo "Waiting 60s before deploying to production in india"
# s3 bucket sync
aws s3 sync dist s3://klindia-prod-auth/latest
aws s3 sync dist s3://klindia-prod-auth/latest --delete
# invalidate cache
aws cloudfront create-invalidation --paths "/*" --distribution-id E2DJ7W3VTT0CDT
