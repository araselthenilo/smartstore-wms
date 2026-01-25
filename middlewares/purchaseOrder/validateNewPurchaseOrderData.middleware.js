import purchaseOrderSchema from '../../validators/purchaseOrder/purchaseOrder.schema.js';
import Supplier from '../../models/Supplier.js';
import Product from '../../models/Product.js';

const validateNewPurchaseOrderData = async (req, res, next) => {
    const { error, value } = purchaseOrderSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    try {
        const supplier = await Supplier.findByPk(value.supplier_id);
        
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: `Supplier with ID ${value.supplier_id} not found.`
            });
        }

        const product = await Product.findByPk(value.product_id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product with ID ${value.supplier_id} not found.`
            });
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

export default validateNewPurchaseOrderData;