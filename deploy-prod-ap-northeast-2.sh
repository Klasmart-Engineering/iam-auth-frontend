#!/usr/bin/env bash
npm ci --no-progress
npm audit fix

API_ENDPOINT="https://api.kidsloop.live/" \
AUTH_ENDPOINT="https://auth.kidsloop.live/" \
REDIRECT_LINK="https://hub.kidsloop.live/" \
ACCOUNT_ENDPOINT_BADANAMU="https://ams-account.badanamu.net" \
AUTH_ENDPOINT_BADANAMU="https://ams-auth.badanamu.net" \
SLD="kidsloop" \
TLD="live" \
npm run build:prod

aws s3 sync dist s3://auth.kidsloop.live/ --dryrun
sleep 15
aws s3 sync s3://auth.kidsloop.live/ backup
aws s3 sync dist s3://auth.kidsloop.live/
aws cloudfront create-invalidation --paths "/*" --distribution-id E134FIUH68FUOQ #auth.kidsloop.net
