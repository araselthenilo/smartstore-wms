import Category from '../models/Category.js';
import { Op } from 'sequelize';

const getAllDeletedCategories = async (req, res) => {
    try {
        const deletedCategories = await Category.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        res.status(200).json({
            success: true,
            deletedCategories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getDeletedCategoryByID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Category.findOne({
            paranoid: false,
            where: {
                category_id: id,
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found or is not deleted.'
            });
        }

        res.status(200).json({
            success: true,
            deletedCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const restoreDeletedCategoryByID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Category.findOne({
            paranoid: false,
            where: {
                category_id: id,
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found or is not deleted.'
            });
        }

        await deletedCategory.restore();

        res.status(200).json({
            success: true,
            message: 'Category successfully restored!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const createCategory = async (req, res) => {
    try {
        const createdCategory = await Category.create(req.validData);

        const userResponse = {
            category_id: createdCategory.category_id,
            name: createdCategory.name,
            description: createdCategory.description,
        };

        res.status(201).json({
            success: true,
            message: 'Category successfully created!',
            data: userResponse
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                success: false,
                message: 'Category Name already exists.'
            });
        }

        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getCategoryByID = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found or is deleted.'
            });
        }

        res.status(200).json({
            success: true,
            category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const updateCategoryByID = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found or is deleted.'
            });
        }

        await category.update(req.validData);

        res.status(200).json({
            success: true,
            message: 'Category successfully updated!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const deleteCategoryByID = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found or is deleted.'
            });
        }

        category.destroy();

        res.status(200).json({
            success: true,
            message: 'Category successfully deleted!'
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
    getAllDeletedCategories,
    getDeletedCategoryByID,
    restoreDeletedCategoryByID,
    createCategory,
    getAllCategories,
    getCategoryByID,
    updateCategoryByID,
    deleteCategoryByID
};