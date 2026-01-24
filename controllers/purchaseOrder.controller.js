import PurchaseOrder from '../models/PurchaseOrder.js';
import { Op } from 'sequelize';

const getAllDeletedPurchaseOrders = async (req, res) => {
    try {
        const deletedPurchaseOrders = await PurchaseOrder.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        res.status(200).json({
            success: true,
            deletedPurchaseOrders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getDeletedPurchaseOrderByID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPurchaseOrder = await PurchaseOrder.findOne({
            paranoid: false,
            where: {
                purchase_order_id: id,
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        if (!deletedPurchaseOrder) {
            return res.status(404).json({
                success: false,
                message: 'Purchase Order not found or is not deleted.'
            });
        }

        res.status(200).json({
            success: true,
            deletedPurchaseOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const restoreDeletedPurchaseOrderByID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPurchaseOrder = await PurchaseOrder.findOne({
            paranoid: false,
            where: {
                purchase_order_id: id,
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        if (!deletedPurchaseOrder) {
            return res.status(404).json({
                success: false,
                message: 'Purchase Order not found or is not deleted.'
            });
        }

        await deletedPurchaseOrder.restore();

        res.status(200).json({
            success: true,
            message: 'Purchase Order successfully restored!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const createPurchaseOrder = async (req, res) => {
    try {
        const createdPurchaseOrder = await PurchaseOrder.create(req.validData);

        const purchaseOrderResponse = {
            purchase_order_id: createdPurchaseOrder.purchase_order_id,
            supplier_id: createdPurchaseOrder.supplier_id,
            admin_id: createdPurchaseOrder.admin_id,
            total_price: createdPurchaseOrder.total_price,
            status: createdPurchaseOrder.status
        };

        res.status(201).json({
            success: true,
            message: 'Purchase Order successfully created!',
            data: purchaseOrderResponse
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                success: false,
                message: 'Purchase Order already exists.'
            });
        }

        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getAllPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.findAll();

        res.status(200).json({
            success: true,
            purchaseOrders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getPurchaseOrderByID = async (req, res) => {
    try {
        const { id } = req.params;

        const purchaseOrder = await PurchaseOrder.findByPk(id);

        if (!purchaseOrder) {
            return res.status(404).json({
                success: false,
                message: 'Purchase Order not found or is deleted.'
            });
        }

        res.status(200).json({
            success: true,
            purchaseOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const updatePurchaseOrderByID = async (req, res) => {
    try {
        const { id } = req.params;

        const purchaseOrder = await PurchaseOrder.findByPk(id);

        if (!purchaseOrder) {
            return res.status(404).json({
                success: false,
                message: 'Purchase Order not found or is deleted.'
            });
        }

        await purchaseOrder.update(req.validData);

        res.status(200).json({
            success: true,
            message: 'Purchase Order successfully updated!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const deletePurchaseOrderByID = async (req, res) => {
    try {
        const { id } = req.params;

        const purchaseOrder = await PurchaseOrder.findByPk(id);

        if (!purchaseOrder) {
            return res.status(404).json({
                success: false,
                message: 'Purchase Order not found or is deleted.'
            });
        }

        purchaseOrder.destroy();

        res.status(200).json({
            success: true,
            message: 'Purchase Order successfully deleted!'
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
    getAllDeletedPurchaseOrders,
    getDeletedPurchaseOrderByID,
    restoreDeletedPurchaseOrderByID,
    createPurchaseOrder,
    getAllPurchaseOrders,
    getPurchaseOrderByID,
    updatePurchaseOrderByID,
    deletePurchaseOrderByID
};