import Joi from 'joi';

const updateProductSchema = Joi.object({
    category_id: Joi.number()
        .integer()
        .positive(),

    sku: Joi.string()
        .max(40)
        .trim(),

    name: Joi.string()
        .max(150)
        .trim(),

    stock_quantity: Joi.number()
        .integer()
        .min(0)
        .default(0),
        
    min_stock_level: Joi.number()
        .integer()
        .min(0)
        .default(0)
})
.min(1)
.options({
    stripUnknown: true
});

export default updateProductSchema;