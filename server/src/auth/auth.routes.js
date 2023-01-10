import AuthController from "./auth.controller.js";
import AuthMiddleware from "./auth.middleware.js"

const {verifyUser,generateTokens}=AuthMiddleware;

import express from "express"
const authRouter=express.Router()

authRouter.post("/login",AuthController.login)
authRouter.post("/register",AuthController.register)
authRouter.post("/refresh_token",generateTokens,AuthController.refresh_token)
authRouter.get("/me",verifyUser,AuthController.me)

authRouter.post("/updatedetails",verifyUser,AuthController.updatedetails)


export default authRouter