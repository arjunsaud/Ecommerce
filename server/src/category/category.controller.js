import CategoryService from "./category.index.js";

const CategoryController = {
  getCategory: async (req, res) => {
    try {
      const category = await CategoryService.getCategory();
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  addCategory: async (req, res) => {
    try {
      const image = req.files[0].filename;
      const { user } = req;
      const data = req.body;
      if (user.role !== "admin") {
        return res.status(200).json({
          message: "Not Authorized",
        });
      } else {
        const addedCategory = await CategoryService.addCategory({
          ...data,
          image,
        });
        return res.status(200).json({
          message: "Category Saved",
          addedCategory,
        });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const id = req.params;
      const category = await CategoryService.deleteCategory(id);
      return res.status(200).json({
        category,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default CategoryController;
