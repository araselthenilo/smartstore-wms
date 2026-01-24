import Joi from 'joi';

const purchaseOrderSchema = Joi.object({
    supplier_id: Joi.number()
        .integer()
        .positive()
        .required(),
    // admin_id biasanya diambil dari token JWT, tapi tetap divalidasi jika dikirim di body
    admin_id: Joi.number()
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
        .messages({
            'any.only': 'Status harus salah satu dari: pending, received, atau cancelled'
        })
})
.options({
    stripUnknown: true
});

export default purchaseOrderSchema;