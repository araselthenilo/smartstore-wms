import { Router } from 'express';
import verifyToken from '../middlewares/auth/verifyToken.middleware.js';
import verifyAdminRole from '../middlewares/auth/verifyAdminRole.middleware.js';
import validateReceivePurchaseOrderData from '../middlewares/purchaseOrder/validateReceivePurchaseOrderData.middleware.js'
import validateNewPurchaseOrderData from '../middlewares/purchaseOrder/validateNewPurchaseOrderData.middleware.js';
import validateUpdatePurchaseOrderData from '../middlewares/purchaseOrder/validateUpdatePurchaseOrderData.middleware.js';
import purchaseOrderController from '../controllers/purchaseOrder.controller.js';

const {
    receivePurchaseOrder,
    getAllDeletedPurchaseOrders,
    getDeletedPurchaseOrderByID,
    restoreDeletedPurchaseOrderByID,
    createPurchaseOrder,
    getAllPurchaseOrders,
    getPurchaseOrderByID,
    updatePurchaseOrderByID,
    deletePurchaseOrderByID
} = purchaseOrderController;

const purchaseOrderRoute = Router();

purchaseOrderRoute.patch('/receive/:id', verifyToken, validateReceivePurchaseOrderData, receivePurchaseOrder);

purchaseOrderRoute.get('/deleted', verifyToken, verifyAdminRole, getAllDeletedPurchaseOrders);
purchaseOrderRoute.get('/deleted/:id', verifyToken, verifyAdminRole, getDeletedPurchaseOrderByID);
purchaseOrderRoute.patch('/restore/:id', verifyToken, verifyAdminRole, restoreDeletedPurchaseOrderByID);

purchaseOrderRoute.post('/', verifyToken, verifyAdminRole, validateNewPurchaseOrderData, createPurchaseOrder);
purchaseOrderRoute.get('/', verifyToken, getAllPurchaseOrders);
purchaseOrderRoute.get('/:id', verifyToken, getPurchaseOrderByID);
purchaseOrderRoute.patch('/:id', verifyToken, verifyAdminRole, validateUpdatePurchaseOrderData, updatePurchaseOrderByID);
purchaseOrderRoute.delete('/:id', verifyToken, verifyAdminRole, deletePurchaseOrderByID);

export default purchaseOrderRoute;