import Joi from 'joi';

const receivePurchaseOrderSchema = Joi.object({
    received_quantity: Joi.number()
        .integer()
        .positive()
        .optional()
});

export default receivePurchaseOrderSchema;