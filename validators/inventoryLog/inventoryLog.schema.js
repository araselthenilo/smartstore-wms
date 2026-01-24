import Joi from 'joi';

const inventoryLogSchema = Joi.object({
    product_id: Joi.number()
        .integer()
        .positive()
        .required(),
    user_id: Joi.number()
        .integer()
        .positive()
        .required(),
    type: Joi.string()
        .valid('In', 'Out')
        .required()
        .messages({
            'any.only': 'Tipe log harus "In" atau "Out"'
        }),
    quantity: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.positive': 'Jumlah barang harus lebih besar dari 0'
        }),
    reason: Joi.string()
        .min(5)
        .required()
        .messages({
            'string.min': 'Alasan harus diisi minimal 5 karakter'
        })
})
.options({
    stripUnknown: true
});

export default inventoryLogSchema;