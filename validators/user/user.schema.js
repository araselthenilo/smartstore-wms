import Joi from 'joi';

const userSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(50)
        .alphanum()
        .required(),
    
    name: Joi.string()
        .min(3)
        .max(150)
        .required(),
    
    email: Joi.string()
        .email()
        .max(255)
        .required(),

    password: Joi.string()
        .min(8)
        .max(255)
        .required(),

    role: Joi.string()
        .valid('staff','administrator')
        .default('staff')
})
.options({
    stripUnknown: true
});

export default userSchema;