import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductService {
  Product;
  constructor(Product) {
    this.Product = Product;
  }

  async addProduct(data) {
    try {
      const newProduct = await new this.Product(data).save();
      const addedProduct = JSON.parse(JSON.stringify(newProduct));
      return addedProduct;
    } catch (err) {
      throw err;
    }
  }

  async getProducts() {
    try {
      const products = await this.Product.find()
      return products
    } catch (error) {
      throw error;
    }
  }
  
  async getProduct(id) {
    try {
      const newproduct = await this.Product.find({ _id: id });
      const product = JSON.parse(JSON.stringify(newproduct));
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteImage(image, id) {
    try {
      const resp = await this.Product.findOneAndUpdate(
        { _id: id },
        { image: "" }
      );
      let imagepath = path.join(__dirname, "../../public/products/");
      if (fs.existsSync(imagepath + image)) {
        fs.unlinkSync(imagepath + image);
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const resp = await this.Product.find({ _id: id.id });
      const file = resp[0].image;
      if (file === undefined || file === "") {
        const newproduct = await this.Product.deleteOne({ _id: id.id });
        return newproduct;
      } else {
        let imagepath = path.join(__dirname, "../../public/products/");
        if (fs.existsSync(imagepath + file)) {
          fs.unlinkSync(imagepath + file);
          const newproduct = await this.Product.deleteOne({ _id: id.id });
          return newproduct;
        } else {
          const newproduct = await this.Product.deleteOne({ _id: id.id });
          return newproduct;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async editProduct(data, id) {
    try {
      const product = await this.Product.updateOne(
        { _id: id.id },
        {
          $set: { ...data },
        }
      );
      return product;
    } catch (error) {
      throw error;
    }
  }

  async editProducti(data, id) {
    try {
      const product = await this.Product.updateOne(
        { _id: id.id },
        { $set: { ...data } }
      );
      return product;
    } catch (error) {
      throw error;
    }
  }

  async searchProducts(filters) {
    try {
      const products = await this.Product.find({ ...filters });
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductsByCategory(category) {
    try {
      const products = await this.Product.find({ category });
      return products;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
