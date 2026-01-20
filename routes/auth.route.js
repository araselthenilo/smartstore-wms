import { Router } from "express";
import { signUp } from "../controllers/auth.controller"

const auth = Router();

auth.post('/signup', signUp);

export default auth;