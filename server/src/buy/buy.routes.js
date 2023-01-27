import BuyController from "./buy.controller.js"
import BuyMiddleware from "./buy.middleware.js"
import express from "express"

const {verifyUser}=BuyMiddleware

const buyRouter=express.Router()

buyRouter.get("/getbuy/:id",verifyUser,BuyController.getBuy)
buyRouter.get("/getall",verifyUser,BuyController.getAll)
buyRouter.post("/addbuy",verifyUser,BuyController.addBuy)

export default buyRouter
