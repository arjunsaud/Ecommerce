import mongoose from "mongoose";
import UserModel from "./user.model.js";
import Product from "./product.model.js";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref: UserModel,
      required: true,
    },
    productid: {
      type: mongoose.Types.ObjectId,
      ref: Product,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("review", ReviewSchema);

export default Review;
