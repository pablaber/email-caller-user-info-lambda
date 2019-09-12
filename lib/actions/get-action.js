'use strict';

const precond = require('precond');
const emailCallerCommonUtils = require('email-caller-common-utils');

const { BadRequestError } = emailCallerCommonUtils.lambdaRouters.errors;

class GetAction {

  /**
   * Creates a new instance of the GetAction class
   * @constructor
   * @param {Object} options - initialization options
   * @prop {Object} userInfoDynamoConnector - the UserInfoDynamoConnector
   */
  constructor(options) {
    this.userInfoDynamoConnector = precond.checkIsObject(options.userInfoDynamoConnector);
  }

  async process(requestEvent) {
    const { userEmail } = requestEvent.queryStringParameters;

    if (!userEmail) {
      throw new BadRequestError('Missing query parameter: "userEmail"')
    }

    debugger;

    const userModel = await this.userInfoDynamoConnector.findByEmail(userEmail);

    return {
      statusCode: 200,
      body: JSON.stringify(userModel),
    }
  };
};

module.exports = GetAction;