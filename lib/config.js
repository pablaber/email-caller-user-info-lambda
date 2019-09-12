'use strict';

module.exports.newInstance = () => {
  const config = {
    dynamodb: {
      region: process.env.DYNAMODB_REGION || 'us-east-2',
      endpoint: process.env.DYNAMODB_ENDPOINT || 'https://dynamodb.us-east-2.amazonaws.com'
    }
  }

  return config;
}