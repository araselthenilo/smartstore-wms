import Joi from 'joi';

const updatePurchaseOrderSchema = Joi.object({
    supplier_id: Joi.number()
        .integer()
        .positive(),

    product_id: Joi.number()
        .integer()
        .positive(),

    quantity: Joi.number()
        .integer()
        .positive(),

    total_price: Joi.number()
        .precision(2)
        .positive(),
        
    status: Joi.string()
        .valid('pending', 'received', 'cancelled')
        .default('pending')
})
.min(1)
.options({
    stripUnknown: true
});

export default updatePurchaseOrderSchema;