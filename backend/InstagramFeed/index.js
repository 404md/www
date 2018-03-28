const fs = require('fs');
const https = require('https');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const path = require('path');
const config = require('./.config.json');

/**
 * Instagram feed retrieve and optimize content
 * @param event
 * @param context
 */
exports.handler = (event, context) => {

    getUserFeed().then(res => {
      let feed = res.data.map(item => {
        return {
          type: item.type,
          link: item.link,
          description: item.caption.text,
          tags: item.tags,
          likes: item.likes,
          images: item.images.standard_resolution,
          videos: (item.type === 'video') ? item.videos.standard_resolution : {},
        };
      });
      let params = {
        Bucket: 'www.404.md',
        Key: 'json/instagram-feed.json',
        Body: JSON.stringify(feed)
      };

      return s3.putObject(params).promise();
    }).then(res => {
      context.succeed('Instagram feed successfully updated');
    }).catch(err => {
      context.fail(err);
    });

  };

  /**
   * Call instagram API
   * @returns {Promise}
   */
  function getUserFeed() {
    let endPoint = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${config.instaToken}&count=20}`;

    return new Promise((resolve, reject) => {
      https.get(endPoint, res => {
        let rawData = '';
        res.on('data', data => {rawData += data;});
        res.on('end', () => {
          if (res.statusCode !== 200) {
            const { meta } = JSON.parse(rawData.toString());
          }
          resolve(JSON.parse(rawData));
        });

      }).on('error', err => {
        reject(err);
      });
    });
  }
