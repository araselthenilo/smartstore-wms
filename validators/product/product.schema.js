import Joi from 'joi';

const productSchema = Joi.object({
    category_id: Joi.number()
        .integer()
        .positive()
        .required(),

    sku: Joi.string()
        .max(40)
        .trim()
        .required(),

    name: Joi.string()
        .max(150)
        .trim()
        .required(),

    stock_quantity: Joi.number()
        .integer()
        .min(0)
        .default(0),
        
    min_stock_level: Joi.number()
        .integer()
        .min(0)
        .default(0)
})
.options({
    stripUnknown: true
});

export default productSchema;