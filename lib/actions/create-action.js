'use strict';

const precond = require('precond');

class CreateAction {
  /**
   * Creates a new instance of the CreateAction class
   * @constructor
   * @param {Object} options - initialization options
   * @prop {Object} userInfoDynamoConnector - the UserInfoDynamoConnector
   */
  constructor(options) {
    this.userInfoDynamoConnector = precond.checkIsObject(options.userInfoDynamoConnector);
  }

  /**
   * Processes a POST /user-info request
   * @param {Object} requestEvent - The request event directly sent to the
   * lambda as an event
   * 
   * @returns {Object} - The response to the input request
   */
  async process(requestEvent) {
    return {
      statusCode: 201,
      body: JSON.stringify({ to: 'do' }),
    }
  }
}

module.exports = CreateAction;