import { Router } from 'express';
import supplierController from '../controllers/supplier.controller.js';
import verifyToken from '../middlewares/auth/verifyToken.middleware.js';
import verifyAdminRole from '../middlewares/auth/verifyAdminRole.middleware.js';
import validateNewSupplierData from '../middlewares/supplier/validateNewSupplierData.middleware.js';
import validateUpdateSupplierData from '../middlewares/supplier/validateUpdateSupplierData.middleware.js';

const {
    getAllDeletedSuppliers,
    getDeletedSupplierByID,
    restoreDeletedSupplierByID,
    createSupplier,
    getAllSuppliers,
    getSupplierByID,
    updateSupplierByID,
    deleteSupplierByID
} = supplierController;

const supplierRoute = Router();

supplierRoute.get('/deleted', verifyToken, verifyAdminRole, getAllDeletedSuppliers);
supplierRoute.get('/deleted/:id', verifyToken, verifyAdminRole, getDeletedSupplierByID);
supplierRoute.patch('/restore/:id', verifyToken, verifyAdminRole, restoreDeletedSupplierByID);

supplierRoute.post('/', verifyToken, verifyAdminRole, validateNewSupplierData, createSupplier);
supplierRoute.get('/', verifyToken, getAllSuppliers);
supplierRoute.get('/:id', verifyToken, getSupplierByID);
supplierRoute.patch('/:id', verifyToken, verifyAdminRole, validateUpdateSupplierData, updateSupplierByID);
supplierRoute.delete('/:id', verifyToken, verifyAdminRole, deleteSupplierByID);

export default supplierRoute;