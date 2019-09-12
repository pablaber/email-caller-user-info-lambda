'use strict';

const emailCallerCommonUtils = require('email-caller-common-utils');

const config = require('./lib/config').newInstance();
const {
  GetAction
} = require('./lib/actions');

const { UserInfoDynamoConnector } = emailCallerCommonUtils.connectors;

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
}

module.exports.handler = async (requestEvent) => {
  console.log(requestEvent);

  const userInfoDynamoConnector = new UserInfoDynamoConnector({
    awsDynamoRegion: config.dynamodb.region,
    awsDynamoEndpoint: config.dynamodb.endpoint,
  });

  const { httpMethod, path } = requestEvent;

  let action;
  switch (httpMethod) {
    case HTTP_METHODS.GET:
      action = new GetAction({
        userInfoDynamoConnector,
      });
      break;
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: {
            name: 'UnsuppportedMethod',
            message: `Cannot ${httpMethod} ${path}`,
          }
        })
      }
  }

  return action.process(requestEvent);
};
