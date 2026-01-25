import { Router } from 'express';
import verifyToken from '../middlewares/auth/verifyToken.middleware.js';
import verifyAdminRole from '../middlewares/auth/verifyAdminRole.middleware.js';
import validateNewCategoryData from '../middlewares/category/validateNewCategoryData.middleware.js';
import validateUpdateCategoryData from '../middlewares/category/validateUpdateCategoryData.middleware.js';
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

categoryRoute.get('/deleted', verifyToken, verifyAdminRole, getAllDeletedCategories);
categoryRoute.get('/deleted/:id', verifyToken, verifyAdminRole, getDeletedCategoryByID);
categoryRoute.patch('/restore/:id', verifyToken, verifyAdminRole, restoreDeletedCategoryByID);

categoryRoute.post('/', verifyToken, verifyAdminRole, validateNewCategoryData, createCategory);
categoryRoute.get('/', verifyToken, getAllCategories);
categoryRoute.get('/:id', verifyToken, getCategoryByID);
categoryRoute.patch('/:id', verifyToken, verifyAdminRole, validateUpdateCategoryData, updateCategoryByID);
categoryRoute.delete('/:id', verifyToken, verifyAdminRole, deleteCategoryByID);

export default categoryRoute;