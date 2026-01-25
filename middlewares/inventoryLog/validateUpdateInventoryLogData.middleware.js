import updateInventoryLogSchema from '../../validators/inventoryLog/updateInventoryLog.schema.js';
import Product from '../../models/Product.js';

const validateUpdateInventoryLogData = async (req, res, next) => {
    const { error, value } = updateInventoryLogSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    try {
        if (value.product_id) {
            const product = await Product.findByPk(value.product_id);
            
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${value.product_id} not found.`
                });
            }
        }

        req.validData = value;
        next();
    } catch (error) {
        console.error('Validation Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error during validation.' 
        });
    }

    req.validData = value;
    next();
};

export default validateUpdateInventoryLogData;