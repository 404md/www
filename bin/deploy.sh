#!/usr/bin/env bash

message() {
    echo -e "\033[38;5;148m"$1"\033[39m"
}

if [ -z $(which aws) ]; then
	echo 'aws cli must be installed on your PC'
	exit 1
fi

MY_DIR=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
APP_DIR=$(dirname ${MY_DIR})
BRANCH=$([ -n "$1" ] && echo "$1" || echo 'dev')
REGION=$([ -n "$2" ] && echo "$2" || echo 'us-west-2')
PROFILE=$([ -n "$3" ] && echo "$3" || echo 'default')

message "## DEPLOY INFO: MY_DIR - ${MY_DIR} / BRANCH: ${BRANCH} / REGION: ${REGION} / PROFILE: ${PROFILE}"

if [ -z ${AWS_ACCESS_KEY_ID+x} ]; then
    AWS_CLI="--profile ${PROFILE}"
else
    AWS_CLI=""
fi

if [ ${BRANCH} != 'master' ]; then
    BUCKET='s3://www-dev.404.md/'
    DIST_ID='EZZ1YSAXOSK4Y'
    MAX_AGE='600'
else
    BUCKET='s3://www.404.md/'
    DIST_ID='E3E50UDRANKEKH'
    MAX_AGE='604800'
fi

message "Build: Start"
${MY_DIR}/travis/build.js ${BRANCH}

message "Synchronizing build directory"
aws s3 sync ${AWS_CLI} ${APP_DIR}/dist/ ${BUCKET} --region ${REGION} \
    --metadata-directive REPLACE --cache-control max-age=${MAX_AGE} \
    --exclude 'dist/css/*' --exclude 'dist/js/*'

aws s3 sync ${AWS_CLI} ${APP_DIR}/dist/css/ ${BUCKET}css/ --region ${REGION} \
    --metadata-directive REPLACE --cache-control max-age=${MAX_AGE} --delete

aws s3 sync ${AWS_CLI} ${APP_DIR}/dist/js/ ${BUCKET}js/ --region ${REGION} \
    --metadata-directive REPLACE --cache-control max-age=${MAX_AGE} --delete

#if [ "${BRANCH}" == "master" ]; then
#    message "Invoking MediumFeedMitocgroup function"
#    aws lambda ${AWS_CLI} invoke --function-name MediumFeedMitocgroup medium-feed.log
#fi

message "Invalidating CloudFront"
aws cloudfront ${AWS_CLI} create-invalidation --distribution-id ${DIST_ID} --paths '/*'

message "Deploy: Done"
