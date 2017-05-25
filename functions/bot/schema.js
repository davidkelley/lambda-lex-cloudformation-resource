import Joi from 'joi';

const generate = () => Math.random().toString(36)
  .replace(/[^a-z]+/g, '')
  .substr(0, 9);

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
  processBehavior: Joi.string().valid('Save', 'Build'),
  voiceId: Joi.string().valid(
    'Geraint', 'Gwyneth', 'Mads', 'Naja', 'Hans', 'Marlene', 'Nicole',
    'Russell', 'Amy', 'Brian', 'Emma', 'Raveena', 'Ivy', 'Joanna',
    'Joey', 'Justin', 'Kendra', 'Kimberly', 'Salli', 'Conchita',
    'Enrique', 'Miguel', 'Penelope', 'Chantal', 'Celine', 'Mathieu',
    'Dora', 'Karl', 'Carla', 'Giorgio', 'Mizuki', 'Liv', 'Lotte',
    'Ruben', 'Ewa', 'Jacek', 'Jan', 'Maja', 'Ricardo', 'Vitoria',
    'Cristiano', 'Ines', 'Carmen', 'Maxim',
    'Tatyana', 'Astrid', 'Filiz'
  ),
});
