import TokenHelper from "../helper/TokenHelper.js";
import AuthHelper from "./auth.helper.js";

import UserModel from "../model/user.model.js";
import Brand from "../model/brand.model.js";
import Category from "../model/category.model.js";
import Offer from "../model/offer.model.js";
import Product from "../model/product.model.js";

class AuthService {
  UserModel;
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async attemptLogin(email, password) {
    try {
      const user = await this.UserModel.findOne({ email });

      if (!user) throw new Error("Authentication failed");

      const isValidPassword = await AuthHelper.compareHash(
        password,
        user.password
      );

      if (!isValidPassword) throw new Error("Authentication failed");

      const token = await TokenHelper.generateToken({ id: user._id });
      const refreshToken = await TokenHelper.generateRefreshToken({
        id: user._id,
        type: "refresh",
      });
      const loggedInUser = JSON.parse(JSON.stringify(user));

      delete loggedInUser.password;

      return { loggedInUser, token, refreshToken };
    } catch (err) {
      throw err;
    }
  }

  async countAll() {
    try {
      const user = await UserModel.count();
      const brand = await Brand.count();
      const category = await Category.count();
      const offer = await Offer.count();
      const product = await Product.count();
      return {
        user,
        brand,
        category,
        offer,
        product,
      };
    } catch (error) {
      throw error;
    }
  }

  async registerUser(data) {
    try {
      const user = await this.UserModel.findOne({ email: data.email });
      if (user) throw new Error("user already exists");
      const hashedPassword = await AuthHelper.hashPassword(data.password);
      const newUser = await new this.UserModel({
        ...data,
        password: hashedPassword,
      }).save();
      const registeredUser = JSON.parse(JSON.stringify(newUser));
      delete registeredUser.password;
      return registeredUser;
    } catch (err) {
      throw err;
    }
  }

  async checkUserAndSendEmail(email) {
    try {
      const user = await this.UserModel.findOne({ email });
      if (!user) throw new Error("user does not exists");

      const token = await TokenHelper.generateToken({ email, id: user.id });
      const subject = "Reset Password- Link";
      const message = `
      <center>
      Please Click on Below link to reset Password
      <a href="http://localhost:3000/changepassword?token=${token}">Click Here</a>
      </center>
      `;
      const data = await AuthHelper.sendEmail(email, subject, message);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(password, token) {
    try {
      const verify = await TokenHelper.verifyToken(token);
      if (!verify) throw new Error("Token Expired");
      const user = await this.UserModel.findOne({ _id: verify.id });
      if (!user) throw new Error("user does not exists");
      const hashedPassword = await AuthHelper.hashPassword(password);
      const data = await this.UserModel.updateOne(
        { _id: verify.id },
        {
          $set: { password: hashedPassword },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
