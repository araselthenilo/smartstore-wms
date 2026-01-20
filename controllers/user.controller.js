import User from '../models/User.js';

const createUser = async (req, res) => {
    try {
        const createdUser = await User.create(req.validData);

        const userResponse = {
            user_id: createdUser.user_id,
            username: createdUser.username,
            name: createdUser.name,
            role: createdUser.role
        };

        res.status(201).json({
            success: true,
            message: 'User successfully created!',
            data: userResponse
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                success: false,
                message: 'Username or Email already exists.'
            });
        }

        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

export default {
    createUser
}