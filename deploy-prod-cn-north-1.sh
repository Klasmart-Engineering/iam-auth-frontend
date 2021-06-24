#!/usr/bin/env bash
git submodule update --init --recursive --force

npm ci --no-progress
npm audit fix

API_ENDPOINT="https://ams.kidsloop.cn/" \
AUTH_ENDPOINT="https://login.kidsloop.cn/" \
REDIRECT_LINK="https://hub.kidsloop.cn/" \
ACCOUNT_ENDPOINT_BADANAMU="https://ams-account.badanamu.net" \
AUTH_ENDPOINT_BADANAMU="https://ams-auth.prod.badanamu.net" \
SLD="kidsloop" \
TLD="cn" \
npm run build:prod

# install deps for deps
pushd src/pages/account/kidsloop-pass-frontend/client
npm ci --no-progress
npm audit fix
npm run build:prod-cn
popd

# bundle deps build and main build
mv src/pages/account/kidsloop-pass-frontend/client/dist ./dist/account

aws s3 sync dist s3://kidsloop-auth-cn-north-1-prod --dryrun --region cn-north-1
echo "Dryrun complete waiting 60s before deployment to prod"
sleep 60
aws s3 sync dist s3://kidsloop-auth-cn-north-1-prod --region cn-north-1
#auth.kidsloop.cn
aws cloudfront create-invalidation --paths "/*" --distribution-id E1GJCYSWV8AGDT --region cn-north-1
