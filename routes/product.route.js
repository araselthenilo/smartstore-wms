import { Router } from 'express';
import verifyToken from '../middlewares/auth/verifyToken.middleware.js';
import verifyAdminRole from '../middlewares/auth/verifyAdminRole.middleware.js';
import validateNewProductData from '../middlewares/product/validateNewProductData.middleware.js';
import validateUpdateProductData from '../middlewares/product/validateUpdateProductData.middleware.js';
import productController from '../controllers/product.controller.js';

const {
    getAllDeletedProducts,
    getDeletedProductByID,
    restoreDeletedProductByID,
    createProduct,
    getAllProducts,
    getProductByID,
    updateProductByID,
    deleteProductByID
} = productController;

const productRoute = Router();

productRoute.get('/deleted', verifyToken, verifyAdminRole, getAllDeletedProducts);
productRoute.get('/deleted/:id', verifyToken, verifyAdminRole, getDeletedProductByID);
productRoute.post('/restore/:id', verifyToken, verifyAdminRole, restoreDeletedProductByID);

productRoute.post('/', verifyToken, verifyAdminRole, validateNewProductData, createProduct);
productRoute.get('/', verifyToken, verifyAdminRole, getAllProducts);
productRoute.get('/:id', verifyToken, verifyAdminRole, getProductByID);
productRoute.patch('/:id', verifyToken, verifyAdminRole, validateUpdateProductData, updateProductByID);
productRoute.delete('/:id', verifyToken, verifyAdminRole, deleteProductByID);

export default productRoute;