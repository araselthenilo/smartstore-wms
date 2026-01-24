import Joi from 'joi';

const userSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(50)
        .alphanum()
        .required()
        .messages({
            'string.alphanum': 'Username must only contain alpha-numeric characters'
        }),
    
    name: Joi.string()
        .min(3)
        .max(150)
        .required()
        .messages({
            'string.empty': 'Name cannot be empty'
        }),
    
    email: Joi.string()
        .email()
        .max(255)
        .required(),

    password: Joi.string()
        .min(8)
        .max(255)
        .required(),

    role: Joi.string()
        .required()
        .valid('staff','administrator')
})
.options({
    stripUnknown: true
});

export default userSchema;