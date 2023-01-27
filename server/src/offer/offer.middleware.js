import TokenHelper from "../helper/TokenHelper.js"
import UserModel from "../model/user.model.js"

const OfferMiddleware={
    verifyUser: async (req, res, next) => {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
          return res.status(401).json({
            message: "Bearer token not provided",
          });
        }
    
        const [bearer, token] = bearerToken.split(" ");
        if (bearer !== "Bearer") {
          return res.status(401).json({
            message: "Bearer token not provided",
          });
        }
    
        try {
          const { id } = await TokenHelper.verifyToken(token);
          const user = await UserModel.findOne({ _id: id }, "-password");
          req.user = user;
          next();
        } catch (err) {
          return res.status(401).json({
            message: err.message,
          });
        }
      },
}
export default OfferMiddleware
