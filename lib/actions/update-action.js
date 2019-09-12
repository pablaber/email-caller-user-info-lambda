'use strict';

const precond = require('precond');
const Ajv = require('ajv');
const emailCallerCommonUtils = require('email-caller-common-utils');

const { BadRequestError } = emailCallerCommonUtils.lambdaRouters.errors;

const schema = require('../schemas/patch-user-info-schema.json');

class UpdateAction {
  /**
   * Creates a new instance of the UpdateAction class
   * @constructor
   * @param {Object} options - initialization options
   * @prop {Object} userInfoDynamoConnector - the UserInfoDynamoConnector
   */
  constructor(options) {
    this.userInfoDynamoConnector = precond.checkIsObject(options.userInfoDynamoConnector);
    this.bodyValidator = new Ajv().compile(schema);
  }

  /**
   * Processes a PATCH /user-info request
   * @param {Object} requestEvent - The request event directly sent to the
   * lambda as an event
   * 
   * @returns {Object} - The response to the input request
   */
  async process(requestEvent) {
    const { email } = requestEvent.queryStringParameters;

    if (!requestEvent.body) {
      throw new BadRequestError('body is required');
    }

    debugger;
    this.body = JSON.parse(requestEvent.body);
    if (!this.bodyValidator(this.body)) {
      throw new BadRequestError(this.bodyValidator.errors.map(e => e.message).join(','));
    }

    if (!email) {
      throw new BadRequestError('Missing query parameter: "email"')
    }

    this.userModel = await this.userInfoDynamoConnector.findByEmail(email);
    if (!this.userModel) {
      throw new NotFoundError(`User with email "${email}" not found.`)
    }

    await this._updateUserModel();

    return {
      statusCode: 200,
      body: JSON.stringify(this.userModel),
    }
  }

  /**
   * Updates a user model, taking the fields in this.body and setting them
   * on the model.
   */
  async _updateUserModel() {
    const { email } = this.body;

    if (email) {
      this.userModel.setEmail(email);
    }

    this.userModel = await this.userInfoDynamoConnector.save(this.userModel);
  }
}

module.exports = UpdateAction;