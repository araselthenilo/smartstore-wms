import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.middleware.js';
import verifyAdminRole from '../middlewares/verifyAdminRole.middleware.js';
import validateUserData from '../middlewares/validateUserData.middleware.js';
import userController from '../controllers/user.controller.js';

const {
    createUser
} = userController;

const userRoute = Router();

userRoute.post('/', verifyToken, verifyAdminRole, validateUserData, createUser);

export default userRoute;