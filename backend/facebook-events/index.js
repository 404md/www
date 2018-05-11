'use strict';

const { httpsRequest } = require('../common/utils');
const S3 = require('aws-sdk/clients/s3');

/**
 * Fetch Facebook events list and save data as json into S3 bucket
 * @param {Object} event
 * @param {Object} context
 * @param {Function} callback
 */
module.exports.handler = (event, context, callback) => {
  const s3 = new S3();
  const count = process.env.COUNT;
  const destKey = process.env.KEY_NAME;
  const apiToken = process.env.API_TOKEN;
  const bucketName = process.env.BUCKET_NAME;

  httpsRequest(eventsEndpoint(apiToken, count)).then(res => {
    if (res.error) {
      throw res.error;
    }

    const feed = res.data.map(item => {
      return {
        id: item.id,
        name: item.name,
        photo: item.cover.source,
        endTime: convertedDate(item.end_time),
        startTime: convertedDate(item.start_time)
      };
    });

    return s3.putObject({ Bucket: bucketName, Key: destKey, Body: JSON.stringify(feed) }).promise();
  }).then(() => {
    callback(null, { statusCode: 200, body: 'Facebook events successfully fetched' });
  }).catch(err => {
    callback(err);
  });
};

/**
 * Get Facebook events API endpoint
 * @param {String} token
 * @param {Number} limit
 * @returns {String}
 */
function eventsEndpoint(token, limit = 20) {
  const api = 'https://graph.facebook.com/v2.10';
  const fields = ['id', 'name', 'cover', 'start_time', 'end_time'];

  return `${api}/404Moldova/events?limit=${limit}&fields=${fields.join(',')}&access_token=${token}`;
}

/**
 * Convert date to Europe/Chisinau timezone
 * @param {String} dateStr
 * @returns {String}
 */
function convertedDate(dateStr) {
  const date = new Date(dateStr);
  const resultDateStr = date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });

  return new Date(resultDateStr).toString();
}
