import Joi from 'joi';

const generate = () => {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9);
};

export const Schema = Joi.object({
  childDirected: Joi.boolean().truthy('true').falsy('false')
    .required(),
  locale: Joi.string().default('en-US').regex(/^[a-z]{2}-[A-Z]{2}$/, 'locale only'),
  name: Joi.string().default(generate, 'default id'),
  abortStatement: Joi.object().keys({
    messages: Joi.array().items(
      Joi.object().keys({
        content: Joi.string().required(),
        contentType: Joi.string().default('PlainText').valid('PlainText', 'SSML'),
      })
    ).required(),
    responseCard: Joi.string(),
  }),
  checksum: Joi.string(),
  clarificationPrompt: Joi.object().keys({
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
  idleSessionTTLInSeconds: Joi.number().min(0),
  intents: Joi.array().items(
    Joi.object().keys({
      intentName: Joi.string().required(),
      intentVersion: Joi.string().required(),
    }),
  ),
  processBehavior: Joi.string().valid('SAVE', 'BUILD'),
  voiceId: Joi.string(),
});
