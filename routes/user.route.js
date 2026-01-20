import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.middleware.js';
import verifyAdminRole from '../middlewares/verifyAdminRole.middleware.js';
import validateNewUserData from '../middlewares/validateNewUserData.middleware.js';
import validateUpdateUserData from '../middlewares/validateUpdateUserData.middleware.js';
import userController from '../controllers/user.controller.js';

const {
    getAllDeletedUsers,
    getDeletedUserByID,
    restoreDeletedUserByID,
    createUser,
    getAllUsers,
    getUserByID,
    updateUserByID,
    deleteUserByID
} = userController;

const userRoute = Router();

userRoute.get('/deleted', verifyToken, verifyAdminRole, getAllDeletedUsers);
userRoute.get('/deleted/:id', verifyToken, verifyAdminRole, getDeletedUserByID);
userRoute.post('/restore/:id', verifyToken, verifyAdminRole, restoreDeletedUserByID);

userRoute.post('/', verifyToken, verifyAdminRole, validateNewUserData, createUser);
userRoute.get('/', verifyToken, verifyAdminRole, getAllUsers);
userRoute.get('/:id', verifyToken, verifyAdminRole, getUserByID);
userRoute.patch('/:id', verifyToken, verifyAdminRole, validateUpdateUserData, updateUserByID);
userRoute.delete('/:id', verifyToken, verifyAdminRole, deleteUserByID);

export default userRoute;