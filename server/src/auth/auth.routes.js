import AuthController from "./auth.controller.js";
import AuthMiddleware from "./auth.middleware.js";

const { verifyUser, generateTokens } = AuthMiddleware;

import express from "express";
const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.post("/refresh_token", generateTokens, AuthController.refresh_token);
authRouter.get("/me", verifyUser, AuthController.me);

authRouter.get("/userme", verifyUser, AuthController.userme);

authRouter.post("/forgetpassword", AuthController.forgetpassword);
authRouter.post("/changepassword", AuthController.changepassword);

authRouter.get("/count", AuthController.countTotal);

export default authRouter;
