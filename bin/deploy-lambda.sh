#!/usr/bin/env bash

isNpmPackageInstalled() {
  which node-lambda $1 > /dev/null 2>&1
}

for package in node-lambda
do
  if ! ( isNpmPackageInstalled $package ); then
      echo $package is NOT installed
      npm install -g node-lambda
  fi
done

LAMBDA=$([ -n "$1" ] && echo "$1" || echo 'this_lambda_doesnt_exist')
PROFILE=$([ -n "$2" ] && echo "$2" || echo 'default')

if [ ${LAMBDA} = 'facebook-events-404md' ]; then
    cd backend/FacebookEvents
    node-lambda deploy
    aws lambda invoke --function-name ${LAMBDA} /dev/null --profile ${PROFILE}
elif [ ${LAMBDA} = 'medium-feed-404md' ]; then
    cd backend/MediumFeed
    npm install
    node-lambda deploy
    aws lambda invoke --function-name ${LAMBDA} /dev/null --profile ${PROFILE}
elif [ ${LAMBDA} = 'instagram-feed-404md' ]; then
    cd backend/InstagramFeed
    node-lambda deploy
    aws lambda invoke --function-name ${LAMBDA} /dev/null --profile ${PROFILE}
else
    echo 'please enter valid lambda facebook-events-404md || medium-feed-404md || instagram-feed-404md'
fi

done
