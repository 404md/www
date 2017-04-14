#!/usr/bin/env bash

echo "### Build: Start ###"
./build.sh

echo "### Deploy: Start ###"
if [ -z $(which aws) ]; then
	echo 'aws cli must be installed on your PC'
	exit 1
fi

region=$([ -n "$1" ] && echo "$1" || echo 'eu-central-1')
profile=$([ -n "$2" ] && echo "$2" || echo 'default')

echo "Synchronizing build/Release/"
aws s3 sync ./build/Release/ s3://www.404.md/ --region ${region} --profile ${profile} \
	--storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=600 \
	--exclude 'backend/*' --exclude 'scss/*'

echo "Invalidating CloudFront"
aws cloudfront create-invalidation --distribution-id E1CHAR53JHGDQK --paths '/*'

echo "Deploy: Done"
