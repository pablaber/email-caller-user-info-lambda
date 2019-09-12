'use strict';

const precond = require('precond');
const emailCallerCommonUtils = require('email-caller-common-utils');

const { BadRequestError, NotFoundError } = emailCallerCommonUtils.lambdaRouters.errors;

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

  /**
   * Processes a GET /user-info request
   * @param {Object} requestEvent - The request event directly sent to the
   * lambda as an event
   * 
   * @returns {Object} - The response to the input request
   */
  async process(requestEvent) {
    const { userEmail } = requestEvent.queryStringParameters;

    if (!userEmail) {
      throw new BadRequestError('Missing query parameter: "userEmail"')
    }

    const userModel = await this.userInfoDynamoConnector.findByEmail(userEmail);

    if (!userModel) {
      throw new NotFoundError(`User with email "${userEmail}" not found.`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify(userModel),
    }
  };
};

module.exports = GetAction;