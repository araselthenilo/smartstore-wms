import Joi from 'joi';

const loginSchema = Joi.object({
    username: Joi.string()
        .trim()
        .alphanum()
        .max(50)
        .required(),

    password: Joi.string()
        .trim()
        .max(255)
        .required()
})
.options({
    stripUnknown: true
});

export default loginSchema;