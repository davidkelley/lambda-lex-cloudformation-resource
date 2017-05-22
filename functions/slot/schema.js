import Joi from 'joi';
import shortid from 'shortid';

export const Schema = Joi.object({
  name: Joi.string().default(shortid.generate, 'default id'),
  checksum: Joi.string(),
  description: Joi.string(),
  enumerationValues: Joi.array().items(
    Joi.string().required()
  ),
});
