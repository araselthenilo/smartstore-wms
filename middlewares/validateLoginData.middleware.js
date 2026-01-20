import loginSchema from '../validators/login.schema.js';

const validateLoginData = async (req, res, next) => {
    const { error, value } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    req.validData = value;
    next();
};

export default validateLoginData;