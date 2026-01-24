import updatePurchaseOrderSchema from '../../validators/purchaseOrder/updatePurchaseOrder.schema.js';

const validateUpdatePurchaseOrderData = async (req, res, next) => {
    const { error, value } = updatePurchaseOrderSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    req.validData = value;
    next();
};

export default validateUpdatePurchaseOrderData;