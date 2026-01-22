import Joi from 'joi';

const updateCategorySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(150)
        .trim()
        .messages({
            'string.empty': 'Name cannot be empty'
        }),
    description: Joi.string()
        .trim()
        .messages({
            'string.empty': 'Description cannot be empty'
        })
})
.min(1)
.options({
    stripUnknown: true
});

export default updateCategorySchema;