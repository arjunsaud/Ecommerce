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
      return users
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
      const products = await this.User.find({ ...filters,$and: [{ role: { $ne: "ADMIN" } }],
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
}

export default UserService
