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

categoryRoute.get('/deleted', verifyToken, verifyAdminRole, getAllDeletedCategories);
categoryRoute.get('/deleted/:id', verifyToken, verifyAdminRole, getDeletedCategoryByID);
categoryRoute.post('/restore/:id', verifyToken, verifyAdminRole, restoreDeletedCategoryByID);

categoryRoute.post('/', verifyToken, verifyAdminRole, validateNewCategoryData, createCategory);
categoryRoute.get('/', verifyToken, verifyAdminRole, getAllCategories);
categoryRoute.get('/:id', verifyToken, verifyAdminRole, getCategoryByID);
categoryRoute.patch('/:id', verifyToken, verifyAdminRole, validateUpdateCategoryData, updateCategoryByID);
categoryRoute.delete('/:id', verifyToken, verifyAdminRole, deleteCategoryByID);

export default categoryRoute;