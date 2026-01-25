import Product from '../models/Product.js';
import { Op } from 'sequelize';

const getAllDeletedProducts = async (req, res) => {
    try {
        const deletedProducts = await Product.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        res.status(200).json({
            success: true,
            deletedProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getDeletedProductByID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findOne({
            paranoid: false,
            where: {
                product_id: id,
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found or is not deleted.'
            });
        }

        res.status(200).json({
            success: true,
            deletedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const restoreDeletedProductByID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findOne({
            paranoid: false,
            where: {
                product_id: id,
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found or is not deleted.'
            });
        }

        await deletedProduct.restore();

        res.status(200).json({
            success: true,
            message: 'Product successfully restored!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const createdProduct = await Product.create(req.validData);

        const userResponse = {
            product_id: createdProduct.product_id,
            category_id: createdProduct.category_id,
            sku: createdProduct.sku,
            name: createdProduct.name,
            stock_quantity: createdProduct.stock_quantity,
            min_stock_level: createdProduct.min_stock_level
        };

        res.status(201).json({
            success: true,
            message: 'Product successfully created!',
            data: userResponse
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                success: false,
                message: 'SKU already exists.'
            });
        }

        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getProductByID = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found or is deleted.'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const updateProductByID = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found or is deleted.'
            });
        }

        await product.update(req.validData);

        res.status(200).json({
            success: true,
            message: 'Product successfully updated!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const deleteProductByID = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found or is deleted.'
            });
        }

        product.destroy();

        res.status(200).json({
            success: true,
            message: 'Product successfully deleted!'
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
    getAllDeletedProducts,
    getDeletedProductByID,
    restoreDeletedProductByID,
    createProduct,
    getAllProducts,
    getProductByID,
    updateProductByID,
    deleteProductByID
};
