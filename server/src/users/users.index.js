import UserModel from '../model/user.model.js';
import UserService from './users.services.js';

const userService = new UserService(UserModel)

export default userService
