import Joi from 'joi';

const generate = () => {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9);
};

export const Schema = Joi.object().keys({
  name: Joi.string().default(generate, 'default id'),
  checksum: Joi.string(),
  description: Joi.string(),
  enumerationValues: Joi.array().items(
     Joi.object().keys({
       value: Joi.string().required(),
     })
  ),
});
