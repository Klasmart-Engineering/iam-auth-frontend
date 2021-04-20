#!/usr/bin/env bash
npm i
npm audit fix
API_ENDPOINT="https://api.alpha.kidsloop.net/" \
AUTH_ENDPOINT="https://auth.alpha.kidsloop.net/" \
REDIRECT_LINK="https://hub.alpha.kidsloop.net/" \
SLD="kidsloop" \
TLD="net" \
npm run build:prod
aws s3 sync dist s3://kidsloop-alpha-auth-rested-mackerel/alpha/latest
aws cloudfront create-invalidation --paths "/*" --distribution-id ELJUEQIM62ZJZ #auth.alpha.kidsloop.net
