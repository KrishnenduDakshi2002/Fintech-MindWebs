import { Request } from "express";
import * as express from 'express';
import { LoginController, SignUpController, verifyToken } from "./Controllers/auth.controller";
import UserAuthentication from "./middleware/verifytoken";
const router = express.Router();

router.get('/',(req:Request,res:express.Response)=>{
    res.json('welcome to Fintech REST API');
})
router.get('/verifytoken',[UserAuthentication],verifyToken);
router.post('/login',LoginController);
router.post('/signup',SignUpController);

export {router};

