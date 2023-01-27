import LinksController from "./links.controller.js"
import LinksMiddleware from "./links.middleware.js"

import express from "express"

const {verifyUser}=LinksMiddleware

const linksRouter=express.Router()

linksRouter.get("/getfaq",LinksController.getFaq)
linksRouter.post("/createfaq",verifyUser,LinksController.createFaq)
linksRouter.delete("/deletefaq/:id",verifyUser,LinksController.deleteFaq)

export default linksRouter
