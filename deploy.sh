#!/usr/bin/env bash

if [ -z $(which aws) ]; then
	echo 'aws cli must be installed on your PC'
	exit 1
fi

region=$([ -n "$1" ] && echo "$1" || echo 'eu-central-1')
profile=$([ -n "$2" ] && echo "$2" || echo 'default')

#echo "Install minifying tools"
#npm install html-minifier -g
#npm install cssnano-cli -g
#npm install uglify-js -g

echo "Minifying css code"
cssnano < ./css/index.css > ./css/index.min.css

echo "Minifying js code"
uglifyjs ./js/main.js -c -m -o ./js/main.min.js
uglifyjs ./js/members.js -c -m -o ./js/members.min.js
uglifyjs ./js/contact.js -c -m -o ./js/contact.min.js
uglifyjs ./js/mc-validate.js -c -m -o ./js/mc-validate.min.js

echo "Copying resources into build/release folder"
rm -rf ./build/Release/*
mkdir -p ./build/Release/
cp -R favicon.png robots.txt sitemap.xml css fonts images js \
	amenities contact gallery invitation media members pricing terms tour tour-ok \
	ro ru ./build/Release/

echo "Minifying html code"
BUILD_FOLDER='./build/Release'
for html_file in $(find . -type f -name "*.html"); do
    html_file_build_path=$(dirname ${html_file})
    mkdir -p ${BUILD_FOLDER}/${html_file_build_path}
    html-minifier --collapse-whitespace --remove-comments ${html_file} -o ${BUILD_FOLDER}/${html_file}
done

echo "Synchronizing build/Release/"
aws s3 sync ./build/Release/ s3://www.404.md/ --region ${region} --profile ${profile} \
	--storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=600 \
	--exclude 'backend/*'

echo "Invalidating CloudFront"
aws cloudfront create-invalidation --distribution-id E1CHAR53JHGDQK --paths '/*'

echo "Done"
