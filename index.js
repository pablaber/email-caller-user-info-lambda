'use strict';

const emailCallerCommonUtils = require('email-caller-common-utils');

const config = require('./lib/config').newInstance();
const {
  GetAction,
  CreateAction,
  UpdateAction,
} = require('./lib/actions');

const { UserInfoDynamoConnector } = emailCallerCommonUtils.connectors;
const { LambdaRouterUtils } = emailCallerCommonUtils.lambdaRouters;
const { NotFoundError } = emailCallerCommonUtils.lambdaRouters.errors;
const { constants, Logger } = emailCallerCommonUtils;

const { METHODS } = constants.HTTP;

module.exports.handler = async (requestEvent) => {
  const logger = new Logger(true);

  logger.debug(requestEvent);

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
    case METHODS.GET:
      action = new GetAction({
        userInfoDynamoConnector,
      });
      break;
    case METHODS.POST:
      action = new CreateAction({
        userInfoDynamoConnector,
      });
      break;
    case METHODS.PATCH:
      action = new UpdateAction({
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
