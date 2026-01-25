import User from '../models/User.js';
import { Op } from 'sequelize';

const getAllDeletedUsers = async (req, res) => {
    try {
        const deletedUsers = await User.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        res.status(200).json({
            success: true,
            deletedUsers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getDeletedUserByID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findOne({
            paranoid: false,
            where: {
                user_id: id,
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found or is not deleted.'
            });
        }

        res.status(200).json({
            success: true,
            deletedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const restoreDeletedUserByID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findOne({
            paranoid: false,
            where: {
                user_id: id,
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found or is not deleted.'
            });
        }

        await deletedUser.restore();

        res.status(200).json({
            success: true,
            message: 'User successfully restored!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

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

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getUserByID = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found or is deleted.'
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const updateUserByID = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found or is deleted.'
            });
        }

        await user.update(req.validData);

        res.status(200).json({
            success: true,
            message: 'User successfully updated!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const deleteUserByID = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found or is deleted.'
            });
        }

        user.destroy();

        res.status(200).json({
            success: true,
            message: 'User successfully deleted!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

export default {
    getAllDeletedUsers,
    getDeletedUserByID,
    restoreDeletedUserByID,
    createUser,
    getAllUsers,
    getUserByID,
    updateUserByID,
    deleteUserByID
};