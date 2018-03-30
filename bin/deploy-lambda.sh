#!/usr/bin/env bash

if [[ -z $(which node-lambda) ]]; then
    echo "Installing node-lambda globally..."
    npm install -g node-lambda
fi

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
    echo 'Please enter valid lambda facebook-events-404md || medium-feed-404md || instagram-feed-404md'
fi
