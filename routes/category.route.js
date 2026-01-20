import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.middleware.js';
import verifyAdminRole from '../middlewares/verifyAdminRole.middleware.js';
import validateNewCategoryData from '../middlewares/validateNewCategoryData.middleware.js';
import validateUpdateCategoryData from '../middlewares/validateUpdateCategoryData.middleware.js';
import categoryController from '../controllers/category.controller.js';

const {
    getAllDeletedCategories,
    getDeletedCategoryByID,
    restoreDeletedCategoryByID,
    createCategory,
    getAllCategories,
    getCategoryByID,
    updateCategoryByID,
    deleteCategoryByID
} = categoryController;

const categoryRoute = Router();

userRoute.get('/deleted', verifyToken, verifyAdminRole, getAllDeletedCategories);
userRoute.get('/deleted/:id', verifyToken, verifyAdminRole, getDeletedCategoryByID);
userRoute.post('/restore/:id', verifyToken, verifyAdminRole, restoreDeletedCategoryByID);

userRoute.post('/', verifyToken, verifyAdminRole, validateNewCategoryData, createCategory);
userRoute.get('/', verifyToken, verifyAdminRole, getAllCategories);
userRoute.get('/:id', verifyToken, verifyAdminRole, getCategoryByID);
userRoute.patch('/:id', verifyToken, verifyAdminRole, validateUpdateCategoryData, updateCategoryByID);
userRoute.delete('/:id', verifyToken, verifyAdminRole, deleteCategoryByID);

export default categoryRoute;