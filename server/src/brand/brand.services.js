class BrandService {
  Brand;
  constructor(Brand) {
    this.Brand = Brand;
  }

  async addBrand(data) {
    try {
      const newBrand = await new this.Brand(data).save();
      const addBrand = JSON.parse(JSON.stringify(newBrand));
      return addBrand;
    } catch (error) {
      throw error;
    }
  }

  async getBrand() {
    try {
      const brand = await this.Brand.find();
      return brand;
    } catch (error) {
      throw error;
    }
  }

  async deleteBrand(id) {
    try {
      const response = await this.Brand.find({ _id: id.id });
      if (!response) {
        throw new Error("Error Occured");
      } else {
        const resp = await this.Brand.deleteOne({ _id: id.id });
        return resp;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default BrandService;
