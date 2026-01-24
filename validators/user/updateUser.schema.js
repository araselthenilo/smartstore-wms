import Joi from 'joi';

const updateUserSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(50)
        .alphanum()
        .messages({
            'string.alphanum': 'Username must only contain alpha-numeric characters'
        }),
    
    name: Joi.string()
        .min(3)
        .max(150),
    
    email: Joi.string()
        .email()
        .max(255),

    password: Joi.string()
        .min(8)
        .max(255),

    role: Joi.string()
        .valid('staff','administrator')
})
.min(1)
.options({
    stripUnknown: true
});

export default updateUserSchema;