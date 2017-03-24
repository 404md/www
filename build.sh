#!/bin/bash

#INPUT_FOLDER='./'
#BUILD_FOLDER='./build/Release/'
BUILD_FOLDER='./build/Release'

for html_file in $(find . -type f -name "index.html"); do
    html_file_build_path=$(dirname ${html_file})
    mkdir -p ${BUILD_FOLDER}/${html_file_build_path}
    html-minifier --collapse-whitespace --remove-comments ${html_file} -o ${BUILD_FOLDER}/${html_file}
done
