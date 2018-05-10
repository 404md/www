'use strict';

const { httpsRequest } = require('../common/utils');
const S3 = require('aws-sdk/clients/s3');

/**
 * Fetch Facebook albums list and save data as json in S3 bucket
 * @param {Object} event
 * @param {Object} context
 * @param {Function} callback
 */
module.exports.handler = (event, context, callback) => {
  const s3 = new S3();
  const destKey = process.env.KEY_NAME;
  const apiToken = process.env.API_TOKEN;
  const bucketName = process.env.BUCKET_NAME;

  httpsRequest(albumsEndpoint(apiToken)).then(res => {
    if (res.error) {
      throw res.error;
    }

    let filtered = res.data.filter(album => {
      return !['Profile Pictures', 'Mobile Uploads', 'Instagram Photos', 'Cover Photos', 'Timeline Photos'].includes(album.name);
    });

    return Promise.all(filtered.map(album => {
      return httpsRequest(photosEndpoint(apiToken, album.id)).then(result => {
        if (result.error) {
          throw result.error;
        }

        album.images = [];
        result.data.forEach(item => {
          album.images.push((item.images[0]).source);
        });
        return Promise.resolve(album);
      });
    })).then(albums => {
      return s3.putObject({ Bucket: bucketName, Key: destKey, Body: JSON.stringify(albums) }).promise();
    });
  }).then(() => {
    callback(null, { statusCode: 200, body: 'Facebook albums successfully fetched' });
  }).catch(err => {
    callback(err);
  });
};

/**
 * Get Facebook albums API endpoint
 * @param {String} token
 * @returns {String}
 */
function albumsEndpoint(token) {
  const api = 'https://graph.facebook.com/v2.10';
  const fields = ['id', 'name', 'count', 'link', 'description', 'created_time'];

  return `${api}/404Moldova/albums?fields=${fields.join(',')}&access_token=${token}`;
}

/**
 * Get Facebook photos API endpoint
 * @param {String} token
 * @param {Number} albumId
 * @returns {String}
 */
function photosEndpoint(token, albumId) {
  const api = 'https://graph.facebook.com/v2.10';
  const fields = ['link', 'images', 'full_picture'];

  return `${api}/404Moldova/photos?limit=4&id=${albumId}&fields=${fields.join(',')}&access_token=${token}`;
}
