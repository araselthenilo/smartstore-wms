import Joi from 'joi';

const updatePurchaseOrderSchema = Joi.object({
    supplier_id: Joi.number()
        .integer()
        .positive(),
    // admin_id biasanya diambil dari token JWT, tapi tetap divalidasi jika dikirim di body
    admin_id: Joi.number()
        .integer()
        .positive(), 
    total_price: Joi.number()
        .precision(2)
        .positive(),
    status: Joi.string()
        .valid('pending', 'received', 'cancelled')
        .default('pending')
        .messages({
            'any.only': 'Status harus salah satu dari: pending, received, atau cancelled'
        })
})
.min(1)
.options({
    stripUnknown: true
});

export default updatePurchaseOrderSchema;