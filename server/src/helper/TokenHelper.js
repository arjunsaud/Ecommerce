import {SECRET} from "../config/variables.js"
import jwt from "jsonwebtoken";

const TokenHelper = {
  generateToken: async (payload, options = { expiresIn: "10m" }) => {
    const token = jwt.sign(payload, SECRET, { ...options });
    return token;
  },

  verifyToken: async (token) => {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  },

  generateRefreshToken : async(payload, options = {expiresIn: '7d'}) => {
    const token = jwt.sign(payload, SECRET, { ...options });
    return token;
  }
};

export default TokenHelper
