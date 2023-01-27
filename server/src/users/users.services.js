import UserHelper from "./user.helper.js";
class UserService {
  User;
  constructor(User) {
    this.User = User;
  }

  async getUsers() {
    try {
      const users = await this.User.find({
        $and: [{ role: { $ne: "admin" } }],
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUser(id) {
    try {
      const user = await this.User.find({ _id: id.id });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async searchUsers(filters) {
    try {
      const products = await this.User.find({
        ...filters,
        $and: [{ role: { $ne: "admin" } }],
      });
      return products;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const response = await this.User.find({ _id: id.id });
      if (!response) {
        throw new Error("Error Occured");
      } else {
        const resp = await this.User.deleteOne({ _id: id.id });
        return resp;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateUserPassword(oldpassword, newpassword, id) {
    try {
      const response = await this.User.find({ _id: id });
      if (!response) throw new Error("Error Occured");
      const isValidPassword = await UserHelper.compareHash(
        oldpassword,
        response[0].password
      );
      if (!isValidPassword) throw new Error("Authentication failed");
      const hashedPassword = await UserHelper.hashPassword(newpassword);
      const user = await this.User.updateOne(
        { _id: id },
        { $set: { password: hashedPassword } }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(data,id) {
    try {
      const user = await this.User.updateOne(
        { _id: id },
        {
          $set: { ...data },
        }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
