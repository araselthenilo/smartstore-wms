import updateUserSchema from '../../validators/user/updateUser.schema.js';

const validateUpdateUserData = async (req, res, next) => {
    const { error, value } = updateUserSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message)
        });
    }

    req.validData = value;
    next();
};

export default validateUpdateUserData;