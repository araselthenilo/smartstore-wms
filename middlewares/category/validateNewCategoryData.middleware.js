import categorySchema from '../../validators/category/category.schema.js';

const validateNewCategoryData = async (req, res, next) => {
    const { error, value } = categorySchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    req.validData = value;
    next();
};

export default validateNewCategoryData;