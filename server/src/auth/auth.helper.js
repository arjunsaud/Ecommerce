import bcrypt from "bcryptjs"
import {SALT} from "../config/variables.js"
const AuthHelper = {
  compareHash: async (plainString, hash) => {
    const isValidHash = await bcrypt.compare(plainString, hash);
    return isValidHash;
  },
  hashPassword: async (plainPassword) => {
    const hash = await bcrypt.hash(plainPassword, parseInt(SALT));
    return hash
  },
};

export default AuthHelper
