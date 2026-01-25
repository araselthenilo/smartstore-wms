import Joi from 'joi';

const updateCategorySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(150)
        .trim(),

    description: Joi.string()
        .min(5)
        .trim()
})
.min(1)
.options({
    stripUnknown: true
});

export default updateCategorySchema;