import Joi from 'joi';

const categorySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(150)
        .trim()
        .required(),

    description: Joi.string()
        .min(5)
        .trim()
        .required()
})
.options({
    stripUnknown: true
});

export default categorySchema;