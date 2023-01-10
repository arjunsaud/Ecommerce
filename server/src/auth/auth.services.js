import TokenHelper from "../helper/TokenHelper.js";
import AuthHelper from "./auth.helper.js";

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

  async registerUser(data) {
    try {
      const user = await this.UserModel.findOne({email:data.email});
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
}

export default AuthService