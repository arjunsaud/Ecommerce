import OfferController from "./offer.controller.js"
import OfferMiddleware from "./offer.middleware.js"
import express from "express"

const {verifyUser}=OfferMiddleware

const offerRouter=express.Router()

offerRouter.get("/getoffer",OfferController.getOffer)
offerRouter.post("/createoffer",verifyUser,OfferController.createOffer)
offerRouter.delete("/deleteoffer/:id",verifyUser,OfferController.deleteOffer)

export default offerRouter
