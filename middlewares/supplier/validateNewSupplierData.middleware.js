import supplierSchema from '../../validators/supplier/supplier.schema.js';

const validateNewSupplierData = async (req, res, next) => {
    const { error, value } = supplierSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    req.validData = value;
    next();
};

export default validateNewSupplierData;