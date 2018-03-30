#!/usr/bin/env bash

if [[ -z $(which node-lambda) ]]; then
    echo "Installing node-lambda globally..."
    npm install -g node-lambda
fi

LAMBDA=$([ -n "$1" ] && echo "$1" || echo 'this_lambda_doesnt_exist')
PROFILE=$([ -n "$2" ] && echo "$2" || echo 'default')
AVAILABLE=('medium-feed-404md' 'instagram-feed-404md' 'facebook-events-404md')

if [[ ! " ${AVAILABLE[@]} " =~ "${LAMBDA}" ]]; then
    echo "Please enter valid lambda name: facebook-events-404md || medium-feed-404md || instagram-feed-404md"
fi

if [ ${LAMBDA} = 'facebook-events-404md' ]; then
    cd backend/FacebookEvents
elif [ ${LAMBDA} = 'medium-feed-404md' ]; then
    cd backend/MediumFeed
elif [ ${LAMBDA} = 'instagram-feed-404md' ]; then
    cd backend/InstagramFeed
fi

echo "Installing lambda's dependencies..."
npm install

echo "Start deploying lambda..."
node-lambda deploy

echo "Invoking lambda function..."
aws lambda invoke --function-name ${LAMBDA} /dev/null --profile ${PROFILE}
