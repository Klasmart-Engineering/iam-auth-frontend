#!/usr/bin/env bash
git submodule update --init --recursive --force

npm ci --no-progress
mv ./.env ./.env.temp
cp deploy/config/internal/.env.alpha ./.env
npm run build
mv ./.env.temp ./.env

# install deps for deps
pushd src/pages/account/kidsloop-pass-frontend/client
npm ci --no-progress
npm run build:kl-alpha
popd

# bundle deps build and main build
mv src/pages/account/kidsloop-pass-frontend/client/dist ./dist/account

aws s3 sync dist s3://kidsloop-alpha-auth-rested-mackerel/alpha/latest
aws cloudfront create-invalidation --paths "/*" --distribution-id ELJUEQIM62ZJZ #auth.alpha.kidsloop.net
