#!/usr/bin/env bash
git submodule update --init --recursive --force

npm ci --no-progress
cp deploy/config/pk/.env.prod ./.env
npm run build

# install deps for deps
cd src/pages/account/kidsloop-pass-frontend/client
npm ci --no-progress
npm run build:prod-pk
cd ../../../../../

# bundle deps build and main build
mv src/pages/account/kidsloop-pass-frontend/client/dist ./dist/account

aws s3 sync s3://klpk-prod-auth/latest/ s3://klpk-prod-auth/$(date "+%Y%m%d") # backup
aws s3 sync dist s3://klpk-prod-auth/latest/
aws cloudfront create-invalidation --paths "/*" --distribution-id E1LJUM4MXIRTNP


