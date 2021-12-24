#!/usr/bin/env bash

npm ci --no-progress
mv ./.env ./.env.temp
cp deploy/config/internal/.env.loadtest ./.env
npm run build
mv ./.env.temp ./.env

aws s3 sync s3://klglobal-loadtest-auth/latest/ s3://klglobal-loadtest-auth/$(date "+%Y%m%d") # backup
aws s3 sync dist s3://klglobal-loadtest-auth/latest
aws cloudfront create-invalidation --paths "/*" --distribution-id E3VV4H336PXD26 #auth.loadtest.kidsloop.live
