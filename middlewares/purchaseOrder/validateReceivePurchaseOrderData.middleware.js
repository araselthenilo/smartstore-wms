import Product from '../../models/Product.js';
import PurchaseOrder from '../../models/PurchaseOrder.js';
import receivePurchaseOrderSchema from '../../validators/purchaseOrder/receivePurchaseOrder.schema.js';

const validateReceivePurchaseOrderData = async (req, res, next) => {
    const { id } = req.params;
    const { error, value } = receivePurchaseOrderSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    try {
        const order = await PurchaseOrder.findByPk(id);
        if (!order) {
            return res.status(404).json({ 
                success: false, 
                message: `Purchase Order with ${value.product_id} not found.` 
            });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ 
                success: false, 
                message: `Order cannot be received because the status is ${order.status}` 
            });
        }

        const product = await Product.findByPk(order.product_id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product with ${value.product_id} not found.` 
            });
        }

        req.validatedOrder = order;
        req.validatedProduct = product;
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

export default validateReceivePurchaseOrderData;