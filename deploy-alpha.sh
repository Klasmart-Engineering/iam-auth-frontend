#!/usr/bin/env bash
npm i
npm run build:dev
aws s3 sync dist s3://auth.kidsloop.net/alpha --dryrun
sleep 5
aws s3 sync dist s3://auth.kidsloop.net/alpha
aws cloudfront create-invalidation --paths "/alpha*" --distribution-id E134FIUH68FUOQ #auth.kidsloop.net
