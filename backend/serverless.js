'use strict';

let stage = 'dev';
let bucket = 'www-dev.404.md';

if (process.argv[3] === 'master') {
  stage = 'master';
  bucket = 'www.404.md'
}

module.exports = {
  service: 'www-404-md',
  custom: {
    bucket: bucket,
    schedule: 'rate(1 day)'
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs6.10',
    stage: stage,
    region: 'us-east-1',
    environment: {
      BUCKET_NAME: '${self:custom.bucket}'
    },
    role: 'arn:aws:iam:::role/ServiceRoleForLambdaEdge'
  },
  package: {
    individually: true,
    exclude: ['./**'],
    include: ['common/**']
  },
  functions: {
    'medium-feed': {
      handler: 'medium-feed/index.handler',
      package: {
        include: ['medium-feed/**']
      },
      environment: {
        COUNT: '3',
        MAX_WIDTH: '590',
        KEY_NAME: 'json/medium-feed.json'
      },
      events: [{schedule: '${self:custom.schedule}'}]
    },
    'instagram-feed': {
      handler: 'instagram-feed/index.handler',
      package: {
        include: ["instagram-feed/**"]
      },
      environment: {
        API_TOKEN: '${ssm:/CodeBuild/MitocGroup/IG_ACCESS_TOKEN}'
      },
      events: [{schedule: '${self:custom.schedule}'}]
    },
    'facebook-events': {
      handler: 'facebook-events/index.handler',
      package: {
        include: ['facebook-events/**']
      },
      environment: {
        COUNT: '6',
        API_TOKEN: '${ssm:/CodeBuild/MitocGroup/FB_ACCESS_TOKEN}',
        KEY_NAME: 'json/facebook-events.json'
      },
      events: [{schedule: '${self:custom.schedule}'}]
    },
    'facebook-albums': {
      handler: 'facebook-albums/index.handler',
      package: {
        include: ['facebook-albums/**']
      },
      environment: {
        API_TOKEN: '${ssm:/CodeBuild/MitocGroup/FB_ACCESS_TOKEN}',
        KEY_NAME: 'json/facebook-albums.json'
      },
      events: [{schedule: '${self:custom.schedule}'}]
    }
  }
};
