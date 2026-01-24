import purchaseOrderSchema from '../../validators/purchaseOrder/purchaseOrder.schema.js';

const validateNewPurchaseOrderData = async (req, res, next) => {
    const { error, value } = purchaseOrderSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    req.validData = value;
    next();
};

export default validateNewPurchaseOrderData;