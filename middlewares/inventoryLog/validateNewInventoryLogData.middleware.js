import inventoryLogSchema from '../../validators/inventoryLog/inventoryLog.schema.js';

const validateNewInventoryLogData = async (req, res, next) => {
    const { error, value } = inventoryLogSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    req.validData = value;
    next();
};

export default validateNewInventoryLogData;