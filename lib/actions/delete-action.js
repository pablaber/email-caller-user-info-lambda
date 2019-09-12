'use strict';

const precond = require('precond');

class DeleteAction {
  /**
   * Creates a new instance of the DeleteAction class
   * @constructor
   * @param {Object} options - initialization options
   * @prop {Object} userInfoDynamoConnector - the UserInfoDynamoConnector
   */
  constructor(options) {
    this.userInfoDynamoConnector = precond.checkIsObject(options.userInfoDynamoConnector);
  }

  /**
   * Processes a DELETE /user-info request
   * @param {Object} requestEvent - The request event directly sent to the
   * lambda as an event
   * 
   * @returns {Object} - The response to the input request
   */
  async process(requestEvent) {
    return {
      statusCode: 204,
      body: JSON.stringify({}),
    }
  }
}

module.exports = DeleteAction;