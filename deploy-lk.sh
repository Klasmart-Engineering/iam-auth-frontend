#!/usr/bin/env bash
git submodule update --init --recursive --force

npm ci --no-progress

cp deploy/config/lk/webpack.prod.config.js webpack.config.js

npm run build

# install deps for deps
cd src/pages/account/kidsloop-pass-frontend/client
npm i --no-progress
npm run build:prod-lk
cd ../../../../../

# bundle deps build and main build
mv src/pages/account/kidsloop-pass-frontend/client/dist ./dist/account

aws s3 sync s3://kllk-prod-auth/latest/ s3://kllk-prod-auth/$(date "+%Y%m%d") # backup
aws s3 sync dist s3://kllk-prod-auth/latest/
aws cloudfront create-invalidation --paths "/*" --distribution-id E2KK8H3DXBUMAM
