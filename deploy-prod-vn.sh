#!/usr/bin/env bash
npm i
npm run build:prod-vn
aws s3 sync dist s3://kidsloop-auth-prod/.vn/ --region ap-northeast-2 --dryrun
echo "Waiting 60s before deploying to production in vietnam"
sleep 60
aws s3 sync dist s3://kidsloop-auth-prod/.vn/ --region ap-northeast-2
aws cloudfront create-invalidation --paths "/*" --distribution-id E5H24J1OSZPKD --region ap-northeast-2 #auth.kidsloop.vn
