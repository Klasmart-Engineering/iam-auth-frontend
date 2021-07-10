#!/usr/bin/env bash
export AWS_PROFILE=hydrogen_cn-north-1

git submodule update --init --recursive --force

npm ci --no-progress

API_ENDPOINT="https://api-ghost.kidsloop.cn/" \
AUTH_ENDPOINT="https://auth-ghost.kidsloop.cn/" \
REDIRECT_LINK="https://hub-ghost.kidsloop.cn/" \
SLD="kidsloop" \
TLD="cn" \
npm run build:ghost

# install deps for deps
pushd src/pages/account/kidsloop-pass-frontend/client
npm ci --no-progress
npm run build:kl-alpha
popd

# bundle deps build and main build
mv src/pages/account/kidsloop-pass-frontend/client/dist ./dist/account

aws s3 sync dist s3://kidsloop-ghost-auth-noted-muskrat
aws cloudfront create-invalidation --paths "/*" --distribution-id E1TULU4T6ABCF8 #auth-ghost.kidsloop.cn
