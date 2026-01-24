import { Router } from 'express';
import verifyToken from '../middlewares/auth/verifyToken.middleware.js';
import verifyAdminRole from '../middlewares/auth/verifyAdminRole.middleware.js';
import validateNewInventoryLogData from '../middlewares/inventoryLog/validateNewInventoryLogData.middleware.js';
import validateUpdateInventoryLogData from '../middlewares/inventoryLog/validateUpdateInventoryLogData.middleware.js';
import inventoryLogController from '../controllers/inventoryLog.controller.js';

const {
    getAllDeletedInventoryLogs,
    getDeletedInventoryLogByID,
    restoreDeletedInventoryLogByID,
    createInventoryLog,
    getAllInventoryLogs,
    getInventoryLogByID,
    updateInventoryLogByID,
    deleteInventoryLogByID
} = inventoryLogController;

const inventoryLogRoute = Router();

inventoryLogRoute.get('/deleted', verifyToken, verifyAdminRole, getAllDeletedInventoryLogs);
inventoryLogRoute.get('/deleted/:id', verifyToken, verifyAdminRole, getDeletedInventoryLogByID);
inventoryLogRoute.post('/restore/:id', verifyToken, verifyAdminRole, restoreDeletedInventoryLogByID);

inventoryLogRoute.post('/', verifyToken, verifyAdminRole, validateNewInventoryLogData, createInventoryLog);
inventoryLogRoute.get('/', verifyToken, verifyAdminRole, getAllInventoryLogs);
inventoryLogRoute.get('/:id', verifyToken, verifyAdminRole, getInventoryLogByID);
inventoryLogRoute.patch('/:id', verifyToken, verifyAdminRole, validateUpdateInventoryLogData, updateInventoryLogByID);
inventoryLogRoute.delete('/:id', verifyToken, verifyAdminRole, deleteInventoryLogByID);

export default inventoryLogRoute;