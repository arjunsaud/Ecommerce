import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  

class CategoryService {
  Category;
  constructor(Category) {
    this.Category = Category;
  }

  async addCategory(data) {
    try {
      const newCategory = await new this.Category(data).save()
      const addCategory = JSON.parse(JSON.stringify(newCategory));
      return addCategory;
    } catch (error) {
      throw error;
    }
  }

  async getCategory() {
    try {
      const category = await this.Category.find();
      return category;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      const response = await this.Category.find({ _id: id.id });
      const file = response[0].image;
      if (file === undefined || file === "") {
        const resp = await this.Category.deleteOne({ _id: id.id });
        return resp;
      } else {
        let imagepath = path.join(__dirname, "../../public/category/");
        if (fs.existsSync(imagepath + file)) {
          fs.unlinkSync(imagepath + file);
          const resp = await this.Category.deleteOne({ _id: id.id });
          return resp;
        } else {
          const resp = await this.Category.deleteOne({ _id: id.id });
          return resp;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryService
