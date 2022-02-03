#!/usr/bin/env bash

npm ci --no-progress
mv ./.env ./.env.temp
cp deploy/config/internal/.env.alpha ./.env
npm run build
mv ./.env.temp ./.env

aws s3 sync dist s3://kidsloop-alpha-auth-rested-mackerel/alpha/latest
aws cloudfront create-invalidation --paths "/*" --distribution-id ELJUEQIM62ZJZ #auth.alpha.kidsloop.net
