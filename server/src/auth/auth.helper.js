import bcrypt from "bcryptjs";
import { SALT, EMAIL, PASSWORD } from "../config/variables.js";
import nodemailer from "nodemailer";
const AuthHelper = {
  compareHash: async (plainString, hash) => {
    const isValidHash = await bcrypt.compare(plainString, hash);
    return isValidHash;
  },
  hashPassword: async (plainPassword) => {
    const hash = await bcrypt.hash(plainPassword, parseInt(SALT));
    return hash;
  },

  sendEmail: async (email, subject, message) => {
    try {
      const mail = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      });
      const mailOptions = {
        from: EMAIL,
        to: email,
        subject,
        html: message,
      };
      return new Promise(function (resolve, reject) {
        mail.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  },
};

export default AuthHelper;
