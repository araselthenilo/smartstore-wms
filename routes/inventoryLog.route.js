import { Router } from 'express';
import verifyToken from '../middlewares/auth/verifyToken.middleware.js';
import validateNewInventoryLogData from '../middlewares/inventoryLog/validateNewInventoryLogData.middleware.js';
import inventoryLogController from '../controllers/inventoryLog.controller.js';

const {
    createInventoryLog,
    getAllInventoryLogs,
    getInventoryLogByID,
} = inventoryLogController;

const inventoryLogRoute = Router();

inventoryLogRoute.post('/', verifyToken, validateNewInventoryLogData, createInventoryLog);
inventoryLogRoute.get('/', verifyToken, getAllInventoryLogs);
inventoryLogRoute.get('/:id', verifyToken, getInventoryLogByID);

export default inventoryLogRoute;