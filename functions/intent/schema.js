import Joi from 'joi';
import shortid from 'short-id';

export const Schema = Joi.object({
  name: Joi.string().default(shortid.generate, 'default id'),
  checksum: Joi.string(),
  conclusionStatement: Joi.object().keys({
    messages: Joi.array().items(
      Joi.object().keys({
        content: Joi.string().required(),
        contentType: Joi.string().default('PlainText').valid('PlainText', 'SSML'),
      })
    ).required(),
    responseCard: Joi.string(),
  }),
  confirmationPrompt: Joi.object().keys({
    maxAttempts: Joi.number().min(0).required(),
    messages: Joi.array().items(
      Joi.object().keys({
        content: Joi.string().required(),
        contentType: Joi.string().default('PlainText').valid('PlainText', 'SSML'),
      })
    ).required(),
    responseCard: Joi.string(),
  }),
  description: Joi.string(),
  dialogCodeHook: Joi.object().keys({
    messageVersion: Joi.string().required(),
    uri: Joi.string().required(),
  }),
  followUpPrompt: Joi.object().keys({
    prompt: Joi.object().keys({
      maxAttempts: Joi.number().min(0).required(),
      messages: Joi.array().items(
        Joi.object().keys({
          content: Joi.string().required(),
          contentType: Joi.string().default('PlainText').valid('PlainText', 'SSML'),
        })
      ).required(),
      responseCard: Joi.string(),
    }).required(),
    rejectionStatement: Joi.object().keys({
      messages: Joi.array().items(
        Joi.object().keys({
          content: Joi.string().required(),
          contentType: Joi.string().default('PlainText').valid('PlainText', 'SSML'),
        })
      ).required(),
      responseCard: Joi.string(),
    }).required(),
  }),
  fulfillmentActivity: Joi.object().keys({
    type: Joi.string().valid('ReturnIntent', 'CodeHook').required(),
    codeHook: Joi.object().keys({
      messageVersion: Joi.string().required(),
      uri: Joi.string().required(),
    }),
  }),
  parentIntentSignature: Joi.string().required(),
  rejectionStatement: Joi.object().keys({
    messages: Joi.array().items(
      Joi.object().keys({
        content: Joi.string().required(),
        contentType: Joi.string().default('PlainText').valid('PlainText', 'SSML'),
      })
    ).required(),
    responseCard: Joi.string(),
  }),
  sampleUtterances: Joi.array().items(Joi.string()),
  slots: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      slotConstraint: Joi.string().valid('Required', 'Optional').required(),
      description: Joi.string(),
      priority: Joi.number().min(0),
      responseCard: Joi.string(),
      sampleUtterances: Joi.array().items(Joi.string()),
      slotType: Joi.string(),
      slotTypeVersion: Joi.string(),
      valueElicitationPrompt: Joi.object().keys({
        maxAttempts: Joi.number().min(0).required(),
        messages: Joi.array().items(
          Joi.object().keys({
            content: Joi.string().required(),
            contentType: Joi.string().default('PlainText').valid('PlainText', 'SSML'),
          }),
        ).required(),
        responseCard: Joi.string(),
      }),
    }),
  ),
});
