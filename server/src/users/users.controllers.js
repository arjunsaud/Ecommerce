import UserService from "./users.index.js";

const UserController = {
  getUser: async (req, res) => {
    const id = req.params;
    const user = await UserService.getUser(id);
    return res.status(200).json({
      user,
    });
  },

  getUsers: async (req, res) => {
    const users = await UserService.getUsers();
    res.status(200).json({
      users,
    });
  },

  searchUsers: async (req, res) => {
    const { search } = req.query;
    let filters = search;
    filters =
      filters && filters !== ""
        ? { email: { $regex: filters, $options: "$i" } }
        : {};
    const user = await UserService.searchUsers(filters);
    return res.status(200).json({
      user,
    });
  },

  deleteUser: async (req, res) => {
    const { user } = req;
    const id = req.params;
    if (user.role !== "admin") {
      return res.status(200).json({
        message: "Not Authorized",
      });
    } else {
      const users = await UserService.deleteUser(id);
      return res.status(200).json({
        message: "User Deleted",
      });
    }
  },

  updateUserPassword: async (req, res) => {
    const { oldpassword, newpassword, id } = req.body;
    try {
      const data = await UserService.updateUserPassword(
        oldpassword,
        newpassword,
        id
      );
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: error.message,
      });
    }
  },
  updateUser: async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const resp = await UserService.updateUser(data, id);
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },
};

export default UserController;
