import CategoryController from "./category.controller.js"
import CategoryMiddleware from "./category.middleware.js"
import express from "express"
import { uploadcategory } from "../utils/upload.js"

const {verifyUser}=CategoryMiddleware

const categoryRouter=express.Router()

categoryRouter.get("/getcategory",CategoryController.getCategory)
categoryRouter.post("/addcategory",uploadcategory,verifyUser,CategoryController.addCategory)
categoryRouter.delete("/deletecategory/:id",verifyUser,CategoryController.deleteCategory)

export default categoryRouter
