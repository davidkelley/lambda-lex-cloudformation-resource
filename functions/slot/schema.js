import Joi from 'joi';
import shortid from 'shortid';

export const Schema = Joi.object().keys({
  name: Joi.string().default(shortid.generate, 'default id'),
  checksum: Joi.string(),
  description: Joi.string(),
  enumerationValues: Joi.array().items(
     Joi.object().keys({
       value: Joi.string().required(),
     })
  ),
});
