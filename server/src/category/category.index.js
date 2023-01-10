import Category from "../model/category.model.js"
import CategoryService from "./category.services.js";

const categoryService = new CategoryService(Category)

export default categoryService
