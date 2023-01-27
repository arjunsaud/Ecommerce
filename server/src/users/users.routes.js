import UserController from "./users.controllers.js";
import UserMiddleware from "./users.middleware.js"

import express from "express";

const {verifyUser}=UserMiddleware

const userRouter = express.Router()

userRouter.get('/getusers',verifyUser,UserController.getUsers)
userRouter.get('/getuser/:id',verifyUser,UserController.getUser)

userRouter.get("/searchusers",verifyUser,UserController.searchUsers)

userRouter.delete('/deleteuser/:id',verifyUser,UserController.deleteUser)

userRouter.post("/updateuser/:id",UserController.updateUser)

userRouter.put("/updateuserpassword",UserController.updateUserPassword)


export default userRouter
