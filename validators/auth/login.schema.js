import Joi from 'joi';

const loginSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .max(50)
        .required()
        .messages({
            'string.alphanum': 'Username must only contain alpha-numeric characters'
        }),

    password: Joi.string()
        .max(255)
        .required()
})
.options({
    stripUnknown: true
});

export default loginSchema;