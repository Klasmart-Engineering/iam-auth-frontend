#!/usr/bin/env bash
npm ci --no-progress
npm audit fix
# config hack and package build
API_ENDPOINT="https://api.kidsloop.in/" \
AUTH_ENDPOINT="https://auth.kidsloop.in/" \
REDIRECT_LINK="https://hub.kidsloop.in/" \
ACCOUNT_ENDPOINT_BADANAMU="https://ams-account.badanamu.net" \
AUTH_ENDPOINT_BADANAMU="https://ams-auth.badanamu.net" \
SLD="kidsloop" \
TLD="in" \
npm run build:prod
echo "Waiting 60s before deploying to production in india"
# s3 bucket sync
aws s3 sync dist s3://klindia-prod-auth/latest
aws s3 sync dist s3://klindia-prod-auth/latest --delete
# invalidate cache
aws cloudfront create-invalidation --paths "/*" --distribution-id E2DJ7W3VTT0CDT
