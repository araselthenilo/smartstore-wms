import updateProductSchema from '../../validators/product/updateProduct.schema.js';
import Category from '../../models/Category.js';

const validateUpdateProductData = async (req, res, next) => {
    const { error, value } = updateProductSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    try {
        if (value.category_id) {    
            const category = await Category.findByPk(value.category_id);
            
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: `Category with ID ${value.category_id} not found.`
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

export default validateUpdateProductData;