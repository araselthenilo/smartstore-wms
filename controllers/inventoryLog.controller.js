import InventoryLog from '../models/InventoryLog.js';
import { Op } from 'sequelize';

const getAllDeletedInventoryLogs = async (req, res) => {
    try {
        const deletedInventoryLogs = await InventoryLog.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        res.status(200).json({
            success: true,
            deletedInventoryLogs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getDeletedInventoryLogByID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedInventoryLog = await InventoryLog.findOne({
            paranoid: false,
            where: {
                inventory_log_id: id,
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        if (!deletedInventoryLog) {
            return res.status(404).json({
                success: false,
                message: 'Inventory Log not found or is not deleted.'
            });
        }

        res.status(200).json({
            success: true,
            deletedInventoryLog
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const restoreDeletedInventoryLogByID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedInventoryLog = await InventoryLog.findOne({
            paranoid: false,
            where: {
                inventory_log_id: id,
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        if (!deletedInventoryLog) {
            return res.status(404).json({
                success: false,
                message: 'Inventory Log not found or is not deleted.'
            });
        }

        await deletedInventoryLog.restore();

        res.status(200).json({
            success: true,
            message: 'Inventory Log successfully restored!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const createInventoryLog = async (req, res) => {
    try {
        const createdInventoryLog = await InventoryLog.create(req.validData);

        const inventoryLogResponse = {
            inventory_log_id: createdInventoryLog.inventory_log_id,
            product_id: createdInventoryLog.product_id,
            user_id: createdInventoryLog.user_id,
            type: createdInventoryLog.type,
            quantity: createdInventoryLog.quantity,
            reason: createdInventoryLog.reason
        };

        res.status(201).json({
            success: true,
            message: 'Inventory Log successfully created!',
            data: inventoryLogResponse
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                success: false,
                message: 'Inventory Log already exists.'
            });
        }

        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getAllInventoryLogs = async (req, res) => {
    try {
        const inventoryLogs = await InventoryLog.findAll();

        res.status(200).json({
            success: true,
            inventoryLogs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getInventoryLogByID = async (req, res) => {
    try {
        const { id } = req.params;

        const inventoryLog = await InventoryLog.findByPk(id);

        if (!inventoryLog) {
            return res.status(404).json({
                success: false,
                message: 'Inventory Log not found or is deleted.'
            });
        }

        res.status(200).json({
            success: true,
            inventoryLog
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const updateInventoryLogByID = async (req, res) => {
    try {
        const { id } = req.params;

        const inventoryLog = await InventoryLog.findByPk(id);

        if (!inventoryLog) {
            return res.status(404).json({
                success: false,
                message: 'Inventory Log not found or is deleted.'
            });
        }

        await inventoryLog.update(req.validData);

        res.status(200).json({
            success: true,
            message: 'Inventory Log successfully updated!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const deleteInventoryLogByID = async (req, res) => {
    try {
        const { id } = req.params;

        const inventoryLog = await InventoryLog.findByPk(id);

        if (!inventoryLog) {
            return res.status(404).json({
                success: false,
                message: 'Inventory Log not found or is deleted.'
            });
        }

        inventoryLog.destroy();

        res.status(200).json({
            success: true,
            message: 'Inventory Log successfully deleted!'
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
    getAllDeletedInventoryLogs,
    getDeletedInventoryLogByID,
    restoreDeletedInventoryLogByID,
    createInventoryLog,
    getAllInventoryLogs,
    getInventoryLogByID,
    updateInventoryLogByID,
    deleteInventoryLogByID
};