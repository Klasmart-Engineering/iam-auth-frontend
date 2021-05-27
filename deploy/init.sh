#!/bin/bash

# Deploy time compile script for frontend auth service.

echo "Kidsloop auth frontend service - site generator."

if [ -f /usr/src/app/dist/index.html ] ; then
  echo "Found \"/usr/src/app/dist/index.html\", skipping site gen..."
else
  echo "File \"/usr/src/app/dist/index.html\" not found, generating site..."
  cd /usr/src/app && ./node_modules/.bin/webpack --config webpack.prod.config.js
  # RUN npm run build:prod
fi
