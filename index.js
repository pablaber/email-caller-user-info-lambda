'use strict';

const emailCallerCommonUtils = require('email-caller-common-utils');

const config = require('./lib/config').newInstance();
const {
  GetAction
} = require('./lib/actions');

const { UserInfoDynamoConnector } = emailCallerCommonUtils.connectors;
const { LambdaRouterUtils } = emailCallerCommonUtils.lambdaRouters;
const { NotFoundError } = emailCallerCommonUtils.lambdaRouters.errors;
const Logger = emailCallerCommonUtils.Logger

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
}

module.exports.handler = async (requestEvent) => {
  console.log(requestEvent);

  const logger = new Logger()

  const userInfoDynamoConnector = new UserInfoDynamoConnector({
    awsDynamoRegion: config.dynamodb.region,
    awsDynamoEndpoint: config.dynamodb.endpoint,
  });

  const utils = new LambdaRouterUtils({
    logger,
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
      return utils.throwLambdaError(new NotFoundError(`Cannot ${httpMethod} ${path}`))
  }

  try {
    const res = await action.process(requestEvent);
    return res;
  } catch (err) {
    return utils.throwLambdaError(err);
  }
};
