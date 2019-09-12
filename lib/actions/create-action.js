'use strict';

const precond = require('precond');
const Ajv = require('ajv');
const emailCallerCommonUtils = require('email-caller-common-utils');

const { BadRequestError } = emailCallerCommonUtils.lambdaRouters.errors;
const { UserInfoModel } = emailCallerCommonUtils.models;

const schema = require('../schemas/post-user-info-schema.json');

class CreateAction {
  /**
   * Creates a new instance of the CreateAction class
   * @constructor
   * @param {Object} options - initialization options
   * @prop {Object} userInfoDynamoConnector - the UserInfoDynamoConnector
   */
  constructor(options) {
    this.userInfoDynamoConnector = precond.checkIsObject(options.userInfoDynamoConnector);
    this.bodyValidator = new Ajv().compile(schema);
  }

  /**
   * Processes a POST /user-info request
   * @param {Object} requestEvent - The request event directly sent to the
   * lambda as an event
   * 
   * @returns {Object} - The response to the input request
   */
  async process(requestEvent) {
    if (!requestEvent.body) {
      throw new BadRequestError('body is required');
    }

    const body = JSON.parse(requestEvent.body);
    if (!this.bodyValidator(body)) {
      throw new BadRequestError(this.bodyValidator.errors.map(e => e.message).join(','));
    }

    const existingUser = await this.userInfoDynamoConnector.findByEmail(body.email);
    if (existingUser) {
      throw new BadRequestError(`A user with email ${body.email} already exists!`);
    }

    const newUserInfoModel = UserInfoModel.create(body);

    const savedUserInfoModel = await this.userInfoDynamoConnector.save(newUserInfoModel);

    return {
      statusCode: 201,
      body: JSON.stringify(savedUserInfoModel),
    }
  }
}

module.exports = CreateAction;