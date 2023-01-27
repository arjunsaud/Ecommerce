import ReviewController from "./review.controller.js";
import ReviewMiddleware from "./review.middleware.js";

import express from "express";

const {verifyUser}=ReviewMiddleware

const reviewRouter = express.Router()

reviewRouter.get('/getreview/:id',ReviewController.getreview)

reviewRouter.get('/checkreview/:user/:product',verifyUser,ReviewController.checkReview)

reviewRouter.post("/createreview",verifyUser,ReviewController.createreview)



export default reviewRouter
