'use strict';

const S3 = require('aws-sdk/clients/s3');
const https = require('https');
const config = require('./.config.json');
const s3 = new S3({ region: 'us-east-1' });

exports.handler = (event, context) => {
  const albumsUrl = `https://graph.facebook.com/v2.10/404Moldova/albums?&fields=created_time,count,link,name,description,id&access_token=${config.accessToken}`;

  getApiResponse(albumsUrl).then(res => {
    if (res.error) {
      throw new Error(res.error.message);
    }

    let fitered = res.data.filter(album => {
      return !['Mobile Uploads', 'Instagram Photos', 'Cover Photos', 'Timeline Photos'].includes(album.name);
    });

    return Promise.all(fitered.map(album => {
      let url = `https://graph.facebook.com/v2.10/404Moldova/photos?limit=4&id=${album.id}&fields=link,images,full_picture&access_token=${config.accessToken}`;
      return getApiResponse(url).then(photos => {

        album.images = [];
        photos.data.forEach(item => {
          album.images.push((item.images.pop()).source);
        });
        return Promise.resolve(album);
      });
    })).then(albumsFull => {
      let params = {
        Bucket: 'www.404.md',
        Key: 'json/facebook-albums-v1.json',
        Body: JSON.stringify(albumsFull)
      };

      return s3.putObject(params).promise();
    });
  }).then(res => {
    context.succeed('Facebook feed successfully updated');
  }).catch(err => {
    context.fail(err);
  });
};

/**
 * Get JSON data
 * @returns {Promise}
 */
function getApiResponse(endpoint) {
  return new Promise((resolve, reject) => {
    https.get(endpoint, res => {
      let rawData = '';
      res.on('data', data => {
        rawData += data;
      });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          const { error } = JSON.parse(rawData.toString());
        }
        resolve(JSON.parse(rawData));
      });
    }).on('error', err => {
      reject(err);
    });
  });
}
