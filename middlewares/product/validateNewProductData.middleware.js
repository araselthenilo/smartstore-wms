import productSchema from '../../validators/product/product.schema.js';
import Category from '../../models/Category.js';

const validateNewProductData = async (req, res, next) => {
    const { error, value } = productSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    try {
        const category = await Category.findByPk(value.category_id);
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: `Category with ID ${value.category_id} not found.`
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

export default validateNewProductData;