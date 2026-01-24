import updateInventoryLogSchema from '../../validators/inventoryLog/updateInventoryLog.schema.js';

const validateUpdateInventoryLogData = async (req, res, next) => {
    const { error, value } = updateInventoryLogSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    req.validData = value;
    next();
};

export default validateUpdateInventoryLogData;