import BrandService from "./brand.index.js";

const BrandController = {
  getBrand: async (req, res) => {
    const brand = await BrandService.getBrand();
    res.status(200).json(brand);
  },

  addBrand: async (req, res) => {
    try {
      const { user } = req;
      const data = req.body;
      if (user.role !== "admin") {
        return res.status(200).json({
          message: "Not Authorized",
        });
      } else {
        const addedBrand = await BrandService.addBrand(data);
        return res.status(200).json({
          message: "Brand Saved",
          addedBrand,
        });
      }
    } catch (error) {
      throw error;
    }
  },

  deleteBrand: async (req, res) => {
    const id = req.params;
    const brand = await BrandService.deleteBrand(id);
    return res.status(200).json({
      brand,
    });
  },
};

export default BrandController;
