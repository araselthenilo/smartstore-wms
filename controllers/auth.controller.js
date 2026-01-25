import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const login = async (req, res) => {
    try {
        const { username, password } = req.validData;

        const user = await User.findOne({ 
            where: { 
                username 
            } 
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password.'
            });
        }

        const token = jwt.sign(
            { 
                user_id: user.user_id, 
                role: user.role 
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: process.env.JWT_EXPIRATION || '1h' 
            }
        );

        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: 3600000
        });

        res.status(200).json({
            success: true,
            message: 'Successfully logged in!',
            user: {
                user_id: user.user_id,
                username: user.username,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('token');

        res.status(200).json({ 
            success: true,
            message: 'Successfully logged out!' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const profile = await User.findByPk(req.user.user_id);

        res.status(200).json({
            success: true,
            profile
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
}

export default {
    login,
    logout, 
    getProfile
};