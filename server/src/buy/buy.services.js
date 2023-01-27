class BuyServices {
  Buy;
  constructor(Buy) {
    this.Buy = Buy;
  }

  async getBuy(id) {
    try {
      const data = await this.Buy.find({ userid: id });
      return data;
    } catch (error) {
      throw error;
    }
  }
   async getAll(){
    try {
      const data = await this.Buy.find().populate("userid");
      return data;      
    } catch (error) {
      throw error
    }
   }

  async addBuy(data, id) {
    try {
      const resp = await this.Buy.find({ userid: id });
      if (resp.length === 0) {
        const response = await this.Buy(data).save();
        return response;
      } else {
        const response = await this.Buy.updateOne(
          { userid: id },
          {
            $push: {
              products: {
                $each: data.products,
              },
            },
          }
        );
        return response;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default BuyServices;
