import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  address: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net"]
      }
    })
    .required(),
  phone: Joi.string().max(10).min(10).required(),
  nationalId: Joi.string().max(16).min(16).required(),
  role: Joi.string().required(),
});
export {
    schema,
};