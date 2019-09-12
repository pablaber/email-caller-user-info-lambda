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
    const { email, id } = requestEvent.queryStringParameters;

    if (!email && !id) {
      throw new BadRequestError('Missing query parameter: "email" or "id".')
    }

    if (email && id) {
      throw new BadRequestError('Must specify either "email" OR "id" query parameter.')
    }

    if (email) {
      this.userModel = await this.userInfoDynamoConnector.findByEmail(email);
    } else if (id) {
      this.userModel = await this.userInfoDynamoConnector.findById(id);
    }

    if (!this.userModel) {
      throw new NotFoundError(`User with email "${email}" not found.`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify(this.userModel),
    }
  };
};

module.exports = GetAction;