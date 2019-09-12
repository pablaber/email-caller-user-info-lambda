'use strict';

const precond = require('precond');

class UpdateAction {
  /**
   * Creates a new instance of the UpdateAction class
   * @constructor
   * @param {Object} options - initialization options
   * @prop {Object} userInfoDynamoConnector - the UserInfoDynamoConnector
   */
  constructor(options) {
    this.userInfoDynamoConnector = precond.checkIsObject(options.userInfoDynamoConnector);
  }

  /**
   * Processes a PATCH /user-info request
   * @param {Object} requestEvent - The request event directly sent to the
   * lambda as an event
   * 
   * @returns {Object} - The response to the input request
   */
  async process(requestEvent) {
    return {
      statusCode: 200,
      body: JSON.stringify({ to: 'do' }),
    }
  }
}

module.exports = UpdateAction;