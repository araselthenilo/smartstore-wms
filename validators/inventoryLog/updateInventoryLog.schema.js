import Joi from 'joi';

const updateInventoryLogSchema = Joi.object({
    product_id: Joi.number()
        .integer()
        .positive(),
    user_id: Joi.number()
        .integer()
        .positive(),
    type: Joi.string()
        .valid('In', 'Out')
        .messages({
            'any.only': 'Tipe log harus "In" atau "Out"'
        }),
    quantity: Joi.number()
        .integer()
        .positive()
        .messages({
            'number.positive': 'Jumlah barang harus lebih besar dari 0'
        }),
    reason: Joi.string()
        .min(5)
        .messages({
            'string.min': 'Alasan harus diisi minimal 5 karakter'
        })
})
.min(1)
.options({
    stripUnknown: true
});

export default updateInventoryLogSchema;