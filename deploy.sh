#!/usr/bin/env bash

#echo "Install minifying tools"
#npm install html-minifier -g
#npm install cssnano-cli -g

echo "Minifying css code"
cssnano < css/index.css > css/index.min.css

echo "Copying resources into build/release folder"
mkdir -p build/Release/
cp -R robots.txt sitemap.xml css fonts images js amenities contact members pricing privacy terms build/Release/

echo "Minifying html code"
html-minifier --collapse-whitespace --remove-comments ./index.html -o build/Release/index.html
html-minifier --collapse-whitespace --remove-comments ./amenities/index.html -o build/Release/amenities/index.html
html-minifier --collapse-whitespace --remove-comments ./contact/index.html -o build/Release/contact/index.html
html-minifier --collapse-whitespace --remove-comments ./members/index.html -o build/Release/members/index.html
html-minifier --collapse-whitespace --remove-comments ./pricing/index.html -o build/Release/pricing/index.html
html-minifier --collapse-whitespace --remove-comments ./privacy/index.html -o build/Release/privacy/index.html
html-minifier --collapse-whitespace --remove-comments ./terms/index.html -o build/Release/terms/index.html

#echo "Synchronizing build/Release/"
#aws s3 sync --delete build/Release/ s3://www.404.md/ --region eu-central-1 --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=604800

#echo "Cleaning up build/Release/"
#rm -rf build/Release/*

echo "Done"
