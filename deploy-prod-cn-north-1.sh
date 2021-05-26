#!/usr/bin/env bash
npm i
npm run build:prod-cn
aws s3 sync dist s3://kidsloop-auth-cn-north-1-prod --dryrun --region cn-north-1
echo "Dryrun complete waiting 60s before deployment to prod"
sleep 60
aws s3 sync dist s3://kidsloop-auth-cn-north-1-prod --region cn-north-1
#auth.kidsloop.cn
aws cloudfront create-invalidation --paths "/*" --distribution-id E1GJCYSWV8AGDT --region cn-north-1
