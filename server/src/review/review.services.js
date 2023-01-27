class ReviewServices {
  Review;
  constructor(Review) {
    this.Review = Review;
  }

  async getReview(id) {
    try {
      const data = await this.Review.find({productid:id}).populate("userid");
      return data;
    } catch (error) {
      throw error;
    }
  }

  async checkReview(user,product){
    try {
      const data=await this.Review.find({$and:[{userid:user},{productid:product}]})
      return data
    } catch (error) {
      throw error
    }
  }

  async createReview(values) {
    try {
      const data = await new this.Review(values).save();
      const review = JSON.parse(JSON.stringify(data));
      return review;
    } catch (error) {
      throw error;
    }
  }
}

export default ReviewServices;
