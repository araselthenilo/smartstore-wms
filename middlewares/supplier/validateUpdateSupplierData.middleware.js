import updateSupplierSchema from '../../validators/supplier/updateSupplier.schema.js';

const validateUpdateSupplierData = async (req, res, next) => {
    const { error, value } = updateSupplierSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    req.validData = value;
    next();
};

export default validateUpdateSupplierData;