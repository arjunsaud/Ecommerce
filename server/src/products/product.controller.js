import ProductService from "./product.index.js";

const ProductController = {
  getproducts: async (req, res) => {
    try {
      const products = await ProductService.getProducts();
      res.json(products);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getproduct: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await ProductService.getProduct(id);
      return res.status(200).json({
        product,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteImage: async (req, res) => {
    try {
      const { image, id } = req.params;
      const resp = await ProductService.deleteImage(image, id);
      return res.status(200).json({
        resp,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  addproduct: async (req, res) => {
    try {
      const image = req.files[0].filename;
      const { user } = req;
      const data = req.body;
      if (user.role !== "admin") {
        return res.status(200).json({
          message: "Not Authorized",
        });
      } else {
        const addedProduct = await ProductService.addProduct({
          ...data,
          image,
        });
        return res.status(200).json({
          message: "Product Saved",
          addedProduct,
        });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  editproduct: async (req, res) => {
    try {
      const id = req.params;
      const data = req.body;
      const editedProduct = await ProductService.editProduct(data, id);
      res.json({
        message: "Product Updated",
        editedProduct,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  editproducti: async (req, res) => {
    try {
      const image = req.files[0].filename;
      const id = req.params;
      const data = req.body;
      const editedProducti = await ProductService.editProducti(
        { ...data, image },
        id
      );
      res.json({
        message: "Product Updated",
        editedProducti,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteproduct: async (req, res) => {
    try {
      const id = req.params;
      const product = await ProductService.deleteProduct(id);
      return res.status(200).json({
        product,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  searchProducts: async (req, res) => {
    try {
      const { search } = req.query;
      let filters = search;
      filters =
        filters && filters !== ""
          ? { name: { $regex: filters, $options: "$i" } }
          : {};
      const products = await ProductService.searchProducts(filters);
      return res.status(200).json({
        products,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  productbycategory: async (req, res) => {
    try {
      const { category } = req.params;
      const products = await ProductService.getProductsByCategory(category);
      return res.status(200).json({
        products,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
export default ProductController;
