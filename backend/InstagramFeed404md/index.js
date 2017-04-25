const fs = require('fs');
const https = require('https');
const config = require('./config.json');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-central-1'});

exports.handler = (event, context) => {

  getUserFeed().then(res => {
    let feed = res.data.map(item => {
      return {
        link: item.link,
        tags: item.tags,
        likes: item.likes,
        images: item.images.standard_resolution
      };
    });

    let params = {
      Bucket: 'www.404.md',
      Key: 'instagram-feed.json',
      Body: JSON.stringify(feed)
    };

    return s3.putObject(params).promise();
  }).then(res => {
    context.succeed('Instagram feed successfully updated');
  }).catch(err => {
    context.fail(err);
  });

};

function getUserFeed() {
  let endpoint = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${config.instaToken}&count=20}`;

  return new Promise((resolve, reject) => {
    https.get(endpoint, res => {
      let rawData = '';

      res.on('data', data => {rawData += data;});
      res.on('end', () => {
        resolve(JSON.parse(rawData));
      });

    }).on('error', err => {
      reject(err);
    });
  });
}
