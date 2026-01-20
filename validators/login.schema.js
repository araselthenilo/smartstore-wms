import Joi from 'joi';

const loginSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(255)
        .required()
        .messages({
            "string.alphanum": "Username must only contain alpha-numeric characters"
        }),

    password: Joi.string()
        .pattern(/^[^\s]{6,255}$/)
        .required()
});

export default loginSchema;