import updateCategorySchema from '../../validators/category/updateCategory.schema.js';

const validateUpdateCategoryData = async (req, res, next) => {
    const { error, value } = updateCategorySchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    req.validData = value;
    next();
};

export default validateUpdateCategoryData;