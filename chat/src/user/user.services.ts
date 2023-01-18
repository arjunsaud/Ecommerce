import mongoose from "mongoose";

import { IUser } from "../model/user.model";

export interface IUserServices {
  createUser(email: string, userid: string, role: string): Promise<IUser>;
  getUser(filter: string): Promise<IUser | null>;
  customerSupport(): Promise<IUser | null>;
  getAll(): Promise<IUser[] | null>;
}

class UserService implements IUserServices {
  private _model;
  constructor(_model: mongoose.Model<IUser>) {
    this._model = _model;
  }

  async createUser(
    email: string,
    userid: string,
    role: string
  ): Promise<IUser> {
    const check=await this._model.findOne({userid})
    if(check===null){
      const user = await this._model.create({ email, userid, role });
      return user;
    }
    return check
  }

  async getUser(filter: string): Promise<IUser | null> {
    const user = await this._model.findOne({ userid: filter });
    return user;
  }

  async getAll():Promise<IUser[] | null>  {
    const user = await this._model.find({ role: { $ne: "admin" } });    
    return user;
  }

  async customerSupport():Promise<IUser | null> {
    const user = await this._model.findOne({ role: "admin" });
    return user;
  }
}

export default UserService;
