import Product from "../model/product.model.js"
import ProductService from "./product.service.js";

const productService = new ProductService(Product)

export default productService
