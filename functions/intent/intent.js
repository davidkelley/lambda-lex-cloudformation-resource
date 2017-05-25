import { LexModelBuildingService } from 'aws-sdk';
import Joi from 'joi';

import { Cloudformation, OK, ERROR } from 'node-lambda-events';
import { AWS_REGION } from '../global';
import { Schema } from './schema';

const PUT_INTENT = 'putIntent';

const DELETE_INTENT = 'deleteIntent';

export default Cloudformation.wrap(class extends Cloudformation {
  async create() {
    try {
      const validated = await this.validate(this.properties);
      const result = await this.lex(PUT_INTENT, validated);
      const { name } = result;
      this.response.respond(OK, { id: name });
    } catch (err) {
      this.response.respond(ERROR, { id: ERROR, reason: err.toString() });
    }
  }

  update() {
    return this.create();
  }

  async delete() {
    try {
      if (!this.id || this.id === ERROR) {
        this.response.respond(OK, { id: this.id });
      } else {
        await this.lex(DELETE_INTENT, { name: this.id });
        this.response.respond(OK, { id: this.id });
      }
    } catch (err) {
      this.response.respond(ERROR, { id: ERROR, reason: err.toString() });
    }
  }

  validate(obj) {
    return new Promise((resolve, reject) => {
      Joi.validate(obj, Schema, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  lex(op, params) {
    return new Promise((resolve, reject) => {
      this.client[op](params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  get client() {
    return new LexModelBuildingService({ region: AWS_REGION });
  }
});
