const fs = require('fs');
const https = require('https');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-central-1'});
const path = require('path');

require('dotenv').config({path: path.join(__dirname, 'deploy.env')})

/**
 * Facebook feed retrieve and optimize content
 * @param event
 * @param context
 */
exports.handler = (event, context) => {
  getEventsFeed().then(res => {
    if (res.error) {
      throw new Error(res.error.message);
    }
    let feed = res.data.map(item => {
      return {
        id: item.id,
        name: item.name,
        date : {
          month: getMonth(item.start_time),
          day: getDay(item.start_time),
          timeInterval: customTimeFormat(item.start_time) + ' - ' + customTimeFormat(item.end_time),
        },
        photo: item.cover.source,
      }
    })

    let params = {
      Bucket: 'www.404.md',
      Key: 'json/facebook-feed.json',
      Body: JSON.stringify(feed)
    };

     return s3.putObject(params).promise();
  }).then(res => {
    context.succeed('Facebook feed successfully updated');
  }).catch(err => {
    context.fail(err);
  });
};

function getEventsFeed() {
  let endPoint = `https://graph.facebook.com/v2.10/404Moldova/events?limit=6&fields=cover,name,start_time,end_time,id&access_token=${process.env.ACCESS_TOKEN}`;

  return new Promise((resolve, reject) => {
    https.get(endPoint, res => {
      let rawData = '';

      res.on('data', data => {rawData += data;});
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
/**
 * Call instagram API
 * @returns {Promise}
 */
function customTimeFormat(string_date) {
  const date = new Date(string_date);
  const KIV_TIMEZONE = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Chisinau' }));
  return pad(KIV_TIMEZONE.getHours()) + ':' + pad(KIV_TIMEZONE.getMinutes());
}

function getDay(string_date) {
  return pad(new Date(string_date).getDate());
}

function getMonth(string_date) {
  return new Date(string_date).getMonth();
}

function pad(number) {
  return ('0' + number).slice(-2);
}
