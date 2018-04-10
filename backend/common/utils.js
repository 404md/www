'use strict';

const https = require('https');

/**
 * Execute http request
 * @returns {Promise}
 */
function httpsRequest(endpoint) {
  return new Promise((resolve, reject) => {

    https.get(endpoint, res => {
      let buffers = [];

      res.on('data', data => buffers.push(data));
      res.on('end', () => {
        resolve(JSON.parse(Buffer.concat(buffers).toString()));
      });
    }).on('error', err => {
      reject(err);
    });
  });
}

exports.httpsRequest = httpsRequest;
