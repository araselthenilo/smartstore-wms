import productSchema from '../../validators/product/product.schema.js';

const validateNewProductData = async (req, res, next) => {
    const { error, value } = productSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    req.validData = value;
    next();
};

export default validateNewProductData;