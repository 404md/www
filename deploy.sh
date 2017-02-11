#!/usr/bin/env bash

#echo "Install minifying tools"
#npm install html-minifier -g
#npm install cssnano-cli -g
#npm install uglify-js -g

# we use --compressed flag so we do not need to compress it again
#echo "Minifying css code"
#cssnano < ./css/index.css > ./css/index.min.css

echo "Minifying js code"
uglifyjs ./js/main.js -c -m -o ./js/main.min.js
uglifyjs ./js/members.js -c -m -o ./js/members.min.js

echo "Copying resources into build/release folder"
rm -rf ./build/Release/*
mkdir -p ./build/Release/
cp -R favicon.png robots.txt sitemap.xml css fonts images js amenities contact members pricing terms tour ro ru ./build/Release/

echo "Minifying html code"
html-minifier --collapse-whitespace --remove-comments ./index.html -o ./build/Release/index.html
html-minifier --collapse-whitespace --remove-comments ./amenities/index.html -o ./build/Release/amenities/index.html
html-minifier --collapse-whitespace --remove-comments ./contact/index.html -o ./build/Release/contact/index.html
html-minifier --collapse-whitespace --remove-comments ./members/index.html -o ./build/Release/members/index.html
html-minifier --collapse-whitespace --remove-comments ./pricing/index.html -o ./build/Release/pricing/index.html
html-minifier --collapse-whitespace --remove-comments ./terms/index.html -o ./build/Release/terms/index.html
html-minifier --collapse-whitespace --remove-comments ./tour/index.html -o ./build/Release/tour/index.html

html-minifier --collapse-whitespace --remove-comments ./ro/index.html -o ./build/Release/ro/index.html
html-minifier --collapse-whitespace --remove-comments ./ro/amenities/index.html -o ./build/Release/ro/amenities/index.html
html-minifier --collapse-whitespace --remove-comments ./ro/contact/index.html -o ./build/Release/ro/contact/index.html
html-minifier --collapse-whitespace --remove-comments ./ro/members/index.html -o ./build/Release/ro/members/index.html
html-minifier --collapse-whitespace --remove-comments ./ro/pricing/index.html -o ./build/Release/ro/pricing/index.html
html-minifier --collapse-whitespace --remove-comments ./ro/terms/index.html -o ./build/Release/ro/terms/index.html

html-minifier --collapse-whitespace --remove-comments ./ru/index.html -o ./build/Release/ru/index.html
html-minifier --collapse-whitespace --remove-comments ./ru/amenities/index.html -o ./build/Release/ru/amenities/index.html
html-minifier --collapse-whitespace --remove-comments ./ru/contact/index.html -o ./build/Release/ru/contact/index.html
html-minifier --collapse-whitespace --remove-comments ./ru/members/index.html -o ./build/Release/ru/members/index.html
html-minifier --collapse-whitespace --remove-comments ./ru/pricing/index.html -o ./build/Release/ru/pricing/index.html
html-minifier --collapse-whitespace --remove-comments ./ru/terms/index.html -o ./build/Release/ru/terms/index.html

echo "Synchronizing build/Release/"
aws s3 sync --delete build/Release/ s3://www.404.md/ --region eu-central-1 --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=604800

echo "Done"
