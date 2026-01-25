import PurchaseOrder from '../models/PurchaseOrder.js';
import InventoryLog from '../models/InventoryLog.js';
import { Op } from 'sequelize';
import db from '../utils/db.util.js';

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
        const createdPurchaseOrder = await PurchaseOrder.create({
            ...req.validData,
            admin_id: req.user.user_id
    });

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

const receivePurchaseOrder = async (req, res) => {
    try {
        const t = await db.transaction();
        
        const order = req.validatedOrder;
        const product = req.validatedProduct;

        const quantityToReceive = (req.validData?.received_quantity) || order.quantity;

        await order.update({ 
            status: 'received' 
        }, { 
            transaction: t 
        });

        const newStock = Number(product.stock_quantity) + Number(quantityToReceive);
        await product.update({ 
            stock_quantity: newStock 
        }, { 
            transaction: t 
        });

        const discrepancyNote = quantityToReceive !== order.quantity 
            ? ` (The difference is ${quantityToReceive - order.quantity} from original purchase order)` 
            : "";

        await InventoryLog.create({
            product_id: order.product_id,
            user_id: req.user.user_id,
            type: 'In',
            quantity: quantityToReceive,
            reason: `Receiving PO #${order.purchase_order_id}${discrepancyNote}`
        }, { 
            transaction: t 
        });

        await t.commit();

        res.status(200).json({
            success: true,
            message: 'Items successfully received and stock quantity updated.',
            data: {
                received: quantityToReceive,
                current_stock: newStock
            }
        });

    } catch (error) {
        await t.rollback();
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
    deletePurchaseOrderByID,
    receivePurchaseOrder
};