//const upload = require('../../utils/upload');
import ProductController from './product.controller.js';
import ProductMiddleware from './product.middleware.js';
import express from "express"
import {upload} from '../utils/upload.js';
const {verifyUser}=ProductMiddleware;

const productRouter = express.Router()


productRouter.get('/getproducts',ProductController.getproducts)


productRouter.get('/getproduct/:id', ProductController.getproduct)

productRouter.delete("/deleteimage/:image/:id",ProductController.deleteImage)

productRouter.get('/productbycategory/:category', ProductController.productbycategory)


productRouter.get("/searchproducts",ProductController.searchProducts)

productRouter.post('/addproduct',upload,verifyUser,ProductController.addproduct)

productRouter.put('/editproduct/:id', verifyUser,ProductController.editproduct)
productRouter.put('/editproducti/:id',upload,verifyUser,ProductController.editproducti)


productRouter.delete('/deleteproduct/:id', verifyUser,ProductController.deleteproduct)

export default productRouter
