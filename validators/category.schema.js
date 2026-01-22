import Joi from 'joi';

const categorySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(150)
        .trim()
        .required()
        .messages({
            'string.empty': 'Name cannot be empty'
        }),
    description: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Description cannot be empty'
        })
})
.options({
    stripUnknown: true
});

export default categorySchema;