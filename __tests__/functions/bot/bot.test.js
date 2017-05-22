'use strict';

import AWS from 'aws-sdk-mock';
import faker from 'faker';

jest.mock('../../__mocks__/request');

const mod = require('../../../handler');

const jestPlugin = require('serverless-jest-plugin');

const lambdaWrapper = jestPlugin.lambdaWrapper;

const wrapped = lambdaWrapper.wrap(mod, { handler: 'Bot' });

describe('λ.bot', () => {
  const region = "us-east-1";

  const stackId = `arn:aws:cloudformation:${region}:${faker.random.word()}/${faker.random.word()}/${faker.random.uuid()}`;

  const responseURL = faker.internet.url();

  const resourceType = `Custom::${faker.random.word()}`;

  const requestId = faker.random.uuid();

  const logicalResourceId = faker.random.uuid();

  const resourceProperties = {
    childDirected: faker.random.boolean(),
    abortStatement: {
      messages: [
        {
          content: faker.random.words(),
          contentType: faker.random.arrayElement(['PlainText', 'SSML']),
        }
      ],
      responseCard: faker.random.uuid(),
    },
    checksum: faker.random.uuid(),
    clarificationPrompt: {
      maxAttempts: 0,
      messages: [
        {
          content: faker.random.words(),
          contentType: faker.random.arrayElement(['PlainText', 'SSML']),
        }
      ],
      responseCard: faker.random.uuid(),
    },
    description: faker.random.uuid(),
    idleSessionTTLInSeconds: 0,
    intents: [{
      intentName: faker.random.uuid(),
      intentVersion: faker.random.uuid(),
    }],
    processBehavior: faker.random.arrayElement(['SAVE', 'BUILD']),
    voiceId: faker.random.uuid(),
  };

  const invalidProperties = {
    name: 12345678,
    abortStatement: 'GO!'
  }

  describe('#create', () => {
    const requestType = "Create";

    const createRequest = (properties) => {
      return {
        StackId: stackId,
        ResponseURL: responseURL,
        ResourceProperties: properties,
        RequestType: requestType,
        ResourceType: resourceType,
        RequestId: requestId,
        LogicalResourceId: logicalResourceId
      }
    };

    const mockLex = jest.fn().mockImplementation((params, cb) => {
      cb(null, params);
    });

    describe('when the request is valid', () => {
      beforeAll(() => {
        AWS.mock('LexModelBuildingService', 'putBot', mockLex);
      });

      it('succesfully creates a lex bot', async () => {
        const payload = createRequest(resourceProperties);
        const response = await wrapped.run(payload);
        expect(response.Status).toEqual("SUCCESS");
        expect(response.PhysicalResourceId).not.toBeNull();
      });

      it('calls lexModelBuildingService', async () => {
        const payload = createRequest(resourceProperties);
        await wrapped.run(payload);
        expect(mockLex).toHaveBeenCalled();
      });

      afterAll(() => {
        AWS.mock('LexModelBuildingService', 'putBot');
      });
    });

    describe('when the request is invalid', () => {
      Object.keys(invalidProperties).forEach((key) => {
        describe(`when ${key} is invalid`, () => {
          it('fails to create a lex bot', async () => {
            let properties = Object.assign({}, resourceProperties);
            properties[key] = invalidProperties[key];
            const payload = createRequest(properties);
            const response = await wrapped.run(payload);
            expect(response.Status).toEqual("FAILED");
            expect(response.Reason).toMatch(new RegExp(`ValidationError.+${key}`, 'i'));
          });
        });
      });
    });
  });

  describe('#update', () => {
    const requestType = "Update";

    const physicalResourceId = faker.random.uuid();

    const updateRequest = (properties) => {
      return {
        StackId: stackId,
        ResponseURL: responseURL,
        ResourceProperties: properties,
        RequestType: requestType,
        ResourceType: resourceType,
        RequestId: requestId,
        PhysicalResourceId: physicalResourceId,
        LogicalResourceId: logicalResourceId
      }
    };

    const mockLex = jest.fn().mockImplementation((params, cb) => {
      cb(null, params);
    });

    describe('when the request is valid', () => {
      beforeAll(() => {
        AWS.mock('LexModelBuildingService', 'deleteBot', mockLex);
      });

      beforeAll(() => {
        AWS.mock('LexModelBuildingService', 'putBot', mockLex);
      });

      it('succesfully updates a lex bot', async () => {
        const payload = updateRequest(resourceProperties);
        const response = await wrapped.run(payload);
        expect(response.Status).toEqual("SUCCESS");
        expect(response.PhysicalResourceId).not.toBeNull();
      });

      it('calls deleteBot and putBot', async () => {
        const payload = updateRequest(resourceProperties);
        await wrapped.run(payload);
        expect(mockLex).toHaveBeenCalled();
      });

      afterAll(() => {
        AWS.mock('LexModelBuildingService', 'putBot');
      });
    });

    describe('when the request is invalid', () => {
      Object.keys(invalidProperties).forEach((key) => {
        describe(`when ${key} is invalid`, () => {
          it('fails to update a Cognito Identity Pool', async () => {
            let properties = Object.assign({}, resourceProperties);
            properties[key] = invalidProperties[key];
            const payload = updateRequest(properties);
            const response = await wrapped.run(payload);
            expect(response.Status).toEqual("FAILED");
            expect(response.Reason).toMatch(new RegExp(`ValidationError.+${key}`, 'i'));
          });
        });
      });
    });
  });

  describe('#delete', () => {
    const requestType = "Delete";

    const physicalResourceId = faker.random.uuid();

    const deleteRequest = (properties) => {
      return {
        StackId: stackId,
        ResponseURL: responseURL,
        ResourceProperties: properties,
        RequestType: requestType,
        ResourceType: resourceType,
        RequestId: requestId,
        PhysicalResourceId: physicalResourceId,
        LogicalResourceId: logicalResourceId
      }
    };

    describe('when no id is set', () => {
      const mockLex = jest.fn().mockImplementation((params, cb) => {
        cb(null, params);
      });

      beforeAll(() => {
        AWS.mock('LexModelBuildingService', 'deleteBot', mockLex);
      });

      it('succesfully deletes a lex bot', async () => {
        const payload = deleteRequest(resourceProperties);
        const failed = Object.assign(payload, { PhysicalResourceId: 'ERROR' });
        const response = await wrapped.run(failed);
        expect(response.Status).toEqual("SUCCESS");
      });

      it('does not call deleteBot', async () => {
        const payload = deleteRequest(resourceProperties);
        await wrapped.run(payload);
        expect(mockLex).not.toHaveBeenCalled();
      });

      afterAll(() => {
        AWS.mock('LexModelBuildingService', 'deleteBot');
      });
    })

    describe('when the request is valid', () => {
      const mockLex = jest.fn().mockImplementation((params, cb) => {
        cb(null, params);
      });

      beforeAll(() => {
        AWS.mock('LexModelBuildingService', 'deleteBot', mockLex);
      });

      it('succesfully deletes a lex bot', async () => {
        const payload = deleteRequest(resourceProperties);
        const response = await wrapped.run(payload);
        expect(response.Status).toEqual("SUCCESS");
      });

      afterAll(() => {
        AWS.mock('LexModelBuildingService', 'deleteBot');
      });
    });
  });
});
