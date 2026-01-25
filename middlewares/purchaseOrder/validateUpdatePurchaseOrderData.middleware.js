import updatePurchaseOrderSchema from '../../validators/purchaseOrder/updatePurchaseOrder.schema.js';
import Supplier from '../../models/Supplier.js';
import Product from '../../models/Product.js';

const validateUpdatePurchaseOrderData = async (req, res, next) => {
    const { error, value } = updatePurchaseOrderSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    try {
        if (value.supplier_id) {
            const supplier = await Supplier.findByPk(value.supplier_id);
            
            if (!supplier) {
                return res.status(404).json({
                    success: false,
                    message: `Supplier with ${value.supplier_id} not found.`
                });
            }
        }
        
        if (value.product_id) {
            const product = await Product.findByPk(value.product_id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ${value.product_id} not found.`
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
};

export default validateUpdatePurchaseOrderData;