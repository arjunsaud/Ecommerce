import AuthService from "./auth.index.js";
const AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const { token, loggedInUser, refreshToken } =
        await AuthService.attemptLogin(email, password);
      return res.status(200).json({
        message: "Logged in successfully",
        data: {
          user: loggedInUser,
          token,
          refreshToken,
        },
      });
    } catch (err) {
      return res.status(401).json({
        message: err.message,
      });
    }
  },

  register: async (req, res) => {
    try {
      const registeredUser = await AuthService.registerUser(req.body);
      return res.status(200).json({
        message: "User Created successfully",
        data: {
          user: registeredUser,
        },
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },

  me: async (req, res) => {
    try {
      const { user } = req;
      return res.status(200).json({
        user,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  countTotal: async (req, res) => {
    try {
      const data = await AuthService.countAll();
      return res.status(200).json(
        data
      );
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  userme: async (req, res) => {
    try {
      const { user } = req;
      if (user.role === "user") {
        return res.status(200).json({
          user,
        });
      } else {
        return res.status(201).json({
          message: "Not Logged In",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  refresh_token: (req, res) => {
    try {
      const { token, refreshToken } = req.tokens;
      return res.status(200).json({
        token,
        refreshToken,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  changepassword: async (req, res) => {
    const { password, token } = req.body;
    try {
      const data = await AuthService.changePassword(password, token);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },

  forgetpassword: async (req, res) => {
    const { email } = req.body;
    try {
      const data = await AuthService.checkUserAndSendEmail(email);
      return res.status(200).json({
        message: "Link Sent",
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },
};

export default AuthController;
