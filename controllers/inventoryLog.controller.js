import InventoryLog from '../models/InventoryLog.js';

const createInventoryLog = async (req, res) => {
    try {
        const createdInventoryLog = await InventoryLog.create({
            ...req.validData,
            user_id: req.user.user_id
        });

        const userResponse = {
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
            data: userResponse
        });
    } catch (error) {
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
                message: 'Inventory Log not found.'
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

export default {
    createInventoryLog,
    getAllInventoryLogs,
    getInventoryLogByID
};