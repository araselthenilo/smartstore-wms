import Joi from 'joi';

const updateSupplierSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(150)
        .trim(),

    contact_person: Joi.string()
        .trim()
        .max(50)
        .pattern(/^(\+?\d{1,3})?\d{9,14}$/),

    email: Joi.string()
        .max(255)
        .email(),
        
    address: Joi.string()
        .trim()
        .min(5)
        .max(1000)
})
.min(1)
.options({
    stripUnknown: true
});

export default updateSupplierSchema;