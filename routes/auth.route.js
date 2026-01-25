import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/auth/verifyToken.middleware.js'
import validateLoginData from '../middlewares/auth/validateLoginData.middleware.js';

const { 
    login, 
    logout, 
    getProfile 
} = authController; 

const authRoute = Router();

authRoute.post('/login', validateLoginData, login);
authRoute.get('/logout', logout);
authRoute.get('/profile', verifyToken, getProfile);

export default authRoute;