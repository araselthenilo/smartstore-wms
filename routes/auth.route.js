import { Router } from 'express';
import validateLoginData from '../middlewares/auth/validateLoginData.middleware.js';
import authController from '../controllers/auth.controller.js';

const { login, logout } = authController; 

const authRoute = Router();

authRoute.post('/login', validateLoginData, login);
authRoute.get('/logout', logout);

export default authRoute;