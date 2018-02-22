#!/usr/bin/env bash

BASE_PATH="midburn-public/2018-camps-index"
STAGING_PATH="${BASE_PATH}/$(python -c "import random; s='abcdefghijklmnopqrstuvwxyz01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'; print(''.join(random.sample(s,32)))")/"
PRODUCTION_PATH="${BASE_PATH}/"

pipenv run dpp run ./build


gsutil -m cp -r -a public-read public "gs://${STAGING_PATH}"
echo "Deployed to staging"
echo "http://storage.googleapis.com/${STAGING_PATH}public/index.html"

#gsutil -m cp -r -a public-read public "gs://${PRODUCTION_PATH}"
#echo "Deployed to production"
#echo "http://storage.googleapis.com/${PRODUCTION_PATH}public/index.html"
