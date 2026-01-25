import Joi from 'joi';

const purchaseOrderSchema = Joi.object({
    supplier_id: Joi.number()
        .integer()
        .positive()
        .required(),

    product_id: Joi.number()
        .integer()
        .positive()
        .required(),

    quantity: Joi.number()
        .integer()
        .positive()
        .required(),

    total_price: Joi.number()
        .precision(2)
        .positive()
        .required(),
        
    status: Joi.string()
        .valid('pending', 'received', 'cancelled')
        .default('pending')
})
.options({
    stripUnknown: true
});

export default purchaseOrderSchema;