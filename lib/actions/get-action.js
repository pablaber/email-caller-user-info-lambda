'use strict';

const precond = require('precond');

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
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: {
            name: 'BadRequest',
            message: 'Missing query parameter: "userEmail',
          }
        }),
      }
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