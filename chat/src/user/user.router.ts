import express from 'express';

import UserController from './user.controller';
const userRouter = express.Router();

userRouter.get('/getuser/:userid',UserController.getuser)

userRouter.post('/createuser',UserController.createuser)

userRouter.get("/getall",UserController.getall)

userRouter.get("/customersupport",UserController.customersupport)

export default userRouter