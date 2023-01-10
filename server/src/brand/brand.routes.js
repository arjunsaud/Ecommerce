import BrandController from "./brand.controller.js";
import BrandMiddleware from "./brand.middleware.js";
import express from "express";

const { verifyUser } = BrandMiddleware

const brandRouter = express.Router();

brandRouter.get("/getbrand", verifyUser, BrandController.getBrand);
brandRouter.post("/addbrand", verifyUser, BrandController.addBrand);
brandRouter.delete("/deletebrand/:id", verifyUser, BrandController.deleteBrand);

export default brandRouter
