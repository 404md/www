'use strict';

const { httpsRequest } = require('../common/utils');
const S3 = require('aws-sdk/clients/s3');

/**
 * Fetch Instagram feed and save data as json into S3 bucket
 * @param {Object} event
 * @param {Object} context
 * @param {Function} callback
 */
module.exports.handler = (event, context, callback) => {
  const s3 = new S3();
  const destKey = process.env.KEY_NAME;
  const apiToken = process.env.API_TOKEN;
  const bucketName = process.env.BUCKET_NAME;

  httpsRequest(mediaEndpoint(apiToken)).then(res => {
    if (res.error) {
      throw res.error;
    }

    const feed = res.data.map(item => {
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

    return s3.putObject({ Bucket: bucketName, Key: destKey, Body: JSON.stringify(feed) }).promise();
  }).then(() => {
    callback(null, { statusCode: 200, body: 'Instagram feed successfully fetched' });
  }).catch(err => {
    callback(err);
  });
};

/**
 * Get Instagram recent media API endpoint
 * @param {String} token
 * @param {Number} limit
 * @returns {String}
 */
function mediaEndpoint(token, limit = 20) {
  return `https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}&count=${limit}`;
}
