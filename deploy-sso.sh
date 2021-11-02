#!/usr/bin/env bash

npm ci --no-progress
mv ./.env ./.env.temp
cp deploy/config/internal/.env.sso ./.env
npm run build
mv ./.env.temp ./.env

aws s3 sync dist s3://klglobal-sso-auth/latest
aws cloudfront create-invalidation --paths "/*" --distribution-id E1Q69EGZ5SFD58 #auth.sso.kidsloop.live
