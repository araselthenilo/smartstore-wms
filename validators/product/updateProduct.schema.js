import Joi from 'joi';

const updateProductSchema = Joi.object({
    category_id: Joi.number()
        .integer()
        .positive()
        .messages({
            'number.base': 'Category ID harus berupa angka',
            'any.required': 'Category ID wajib diisi'
        }),
    sku: Joi.string()
        .max(40)
        .trim()
        .messages({
            'string.max': 'SKU maksimal 40 karakter',
            'any.required': 'SKU wajib diisi'
        }),
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