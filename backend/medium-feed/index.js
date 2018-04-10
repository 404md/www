'use strict';

const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const Jimp = require('jimp');
const { httpsRequest } = require('../common/utils');

/**
 * Fetch Medium feed list and save data as json into S3 bucket
 * @param {Object} event
 * @param {Object} context
 * @param {Function} callback
 */
module.exports.handler = (event, context, callback) => {
  const s3 = new S3();
  const count = process.env.COUNT;
  const destKey = process.env.KEY_NAME;
  const bucketName = process.env.BUCKET_NAME;
  const imgMaxWidth = process.env.MAX_WIDTH;
  const mediumFeedData = 'https://api.rss2json.com/v1/api.json?rss_url=https://blog.404.md/feed';

  httpsRequest(mediumFeedData).then(res => {
    if (res.status.toLowerCase() !== 'ok') {
      throw new Error(res.message);
    }

    const posts = res.items.slice(0, count).map(post => {
      return {
        url: post.link,
        title: post.title,
        imageUrl: post.thumbnail.replace(/max\/\d+/, `max/${imgMaxWidth}`),
        description: post.description,
        localImage: path.join('img', 'medium', post.thumbnail.replace(/^.*?(?=[0-9]+\*)/, '')),
      }
    });

    const imgUrls = posts.map(post => post.imageUrl);

    return Promise.all(imgUrls.map(imgUrl => optimizeImage(imgUrl))).then(imgBuffers => {
      return Promise.all(imgBuffers.map((imgBuffer, index) =>
        s3.upload({
          Bucket: bucketName,
          Key: imageKeyspace(imgUrls[index]),
          Body: imgBuffer,
          CacheControl: 'max-age=604800'
        }).promise()
      ));
    }).then(() => {
      return s3.putObject({ Bucket: bucketName, Key: destKey, Body: JSON.stringify(posts) }).promise();
    });
  }).then(() => {
    callback(null, { statusCode: 200, body: 'Medium feed successfully fetched' });
  }).catch(err => {
    callback(err);
  });
};

/**
 * Get destination image keyspace
 * @param {String} imageUrl
 * @returns {String}
 */
function imageKeyspace(imageUrl) {
  const imageName = imageUrl.replace(/^.*?(?=[0-9]+\*)/, '');

  return `images/medium/${imageName}`;
}

/**
 * Download and optimize image
 * @param {String} imageUrl
 * @returns {Promise}
 */
function optimizeImage(imageUrl) {
  return new Promise((resolve, reject) => {
    Jimp.read(imageUrl).then(image => {
      image
        .quality(60)
        .getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
          if (err) {
            return reject(err);
          }

          resolve(buffer);
        });
    }).catch(err => reject(err));
  });
}
