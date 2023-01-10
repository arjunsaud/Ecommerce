import UserModel from "../model/user.model.js"
import AuthService from "./auth.services.js"

const authService = new AuthService(UserModel)

export default authService
