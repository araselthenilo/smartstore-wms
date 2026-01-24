import updateProductSchema from '../../validators/product/updateProduct.schema.js';

const validateUpdateProductData = async (req, res, next) => {
    const { error, value } = updateProductSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    req.validData = value;
    next();
};

export default validateUpdateProductData;