import Joi from 'joi';

const inventoryLogSchema = Joi.object({
    product_id: Joi.number()
        .integer()
        .positive()
        .required(),

    type: Joi.string()
        .valid('In', 'Out')
        .required(),

    quantity: Joi.number()
        .integer()
        .positive()
        .required(),

    reason: Joi.string()
        .min(5)
        .trim()
        .required()
})
.min(1)
.options({
    stripUnknown: true
});

export default inventoryLogSchema;