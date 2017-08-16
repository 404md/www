#!/usr/bin/env bash

BUILD_FOLDER='./build/Release'
ENV=$([ -n "$1" ] && echo "$1" || echo 'dev')

echo "Minifying css code"
cssnano < ./css/index.css > ./css/index.min.css

echo "Minifying js code"
uglifyjs ./js/main.js -c -m -o ./js/main.min.js
uglifyjs ./js/members.js -c -m -o ./js/members.min.js
uglifyjs ./js/events.js -c -m -o ./js/events.min.js
uglifyjs ./js/contact.js -c -m -o ./js/contact.min.js
uglifyjs ./js/mc-validate.js -c -m -o ./js/mc-validate.min.js

echo "Copying resources into '${BUILD_FOLDER}' folder"
rm -rf ${BUILD_FOLDER}/*
mkdir -p ${BUILD_FOLDER}/

if [ ${ENV} == 'dev' ]; then
    cp robots-dev.txt ${BUILD_FOLDER}/robots.txt
else
    cp robots.txt ${BUILD_FOLDER}/robots.txt
    cp sitemap.xml ${BUILD_FOLDER}/sitemap.xml
fi

cp -R favicon.png css fonts images js amenities contact coworking \
	gallery invitation media members terms tour tour-ok ro ru \
	${BUILD_FOLDER}/

echo "Minifying html code"
for html_file in $(find . -type f -name "*.html"); do
    html_file_build_path=$(dirname ${html_file})
    mkdir -p ${BUILD_FOLDER}/${html_file_build_path}
    html-minifier --collapse-whitespace --remove-comments ${html_file} -o ${BUILD_FOLDER}/${html_file}
done

echo "Build: Done"
