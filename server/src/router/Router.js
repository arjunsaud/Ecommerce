import express from "express"
import authRouter from "../auth/auth.routes.js"
import productRouter from "../products/product.routes.js"
import brandRouter from "../brand/brand.routes.js"
import categoryRouter from "../category/category.routes.js"
import userService from "../users/users.routes.js"

const routes=express.Router()

routes.use("/auth",authRouter)
routes.use("/product",productRouter)
routes.use("/category",categoryRouter)
routes.use("/brand",brandRouter)
routes.use("/users",userService)
export default routes