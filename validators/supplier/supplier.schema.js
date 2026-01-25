import Joi from 'joi';

const supplierSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(150)
        .trim()
        .required(),

    contact_person: Joi.string()
        .trim()
        .max(50)
        .pattern(/^(\+?\d{1,3})?\d{9,14}$/)
        .required(),

    email: Joi.string()
        .max(255)
        .trim()
        .email()
        .required(),

    address: Joi.string()
        .trim()
        .min(5)
        .max(1000)
        .required()
})
.options({
    stripUnknown: true
});

export default supplierSchema;