import mongoose from "mongoose";
import UserModel from "./user.model.js";

const Schema = mongoose.Schema;

const BuySchema = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref: UserModel,
      required: true,
    },
    products:{
      type:Array,
      default:[]
    },
  },
  {
    timestamps: true,
  }
);

const Buy = mongoose.model("buy", BuySchema);

export default Buy;
