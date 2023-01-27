import ReviewServices from "./review.index.js";

const ReviewController = {
  getreview: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await ReviewServices.getReview(id);
      return res.status(200).json({
        user,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  checkReview: async (req, res) => {
    try {
      const { user, product } = req.params;
      const data = await ReviewServices.checkReview(user, product);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  createreview: async (req, res) => {
    try {
      const data = req.body;
      const review = await ReviewServices.createReview(data);
      return res.status(200).json(review);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },
};

export default ReviewController;
