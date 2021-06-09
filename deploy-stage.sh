#!/usr/bin/env bash
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

aws s3 sync dist s3://auth.kidsloop.net/stage --dryrun
sleep 5
aws s3 sync dist s3://auth.kidsloop.net/stage
aws cloudfront create-invalidation --paths "/stage*" --distribution-id E134FIUH68FUOQ #auth.kidsloop.net
