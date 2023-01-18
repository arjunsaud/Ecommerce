import { Request, Response } from "express";
import UserModel from "../model/user.model";
import UserService from "./user.services";

const UserController = {
  getuser: async (req: Request, res: Response) => {
    const {userid}=req.params    
    try {
      const userServices = new UserService(UserModel);
      const user = await userServices.getUser(userid);
      if(user!==null){
        return res.status(200).json({
          user,
          message: "User Found",
        });        
      }else{
        return res.status(200).json({
          user,
          message: "User Not Found",
        });
      }      
    } catch (error) {
      return res.status(400).json({
        message: "Error Finding User",
        err: JSON.stringify(error),
      });
    }
  },

  customersupport:async(req:Request,res:Response)=>{
    try {
      const userServices = new UserService(UserModel);
      const user = await userServices.customerSupport();
      return res.status(200).json({
        user,
        message: "Admin Found",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error Finding Admin",
        err: JSON.stringify(error),
      });
    }    
  },

  getall:async(req:Request,res:Response)=>{
    try {
      const userServices = new UserService(UserModel);
      const user = await userServices.getAll();
      return res.status(200).json({
        user
      });

    } catch (error) {
      return res.status(400).json({
        err: JSON.stringify(error),
      });
    } 
  },

  createuser: async (req: Request, res: Response) => {
    const { email, userid,role } = req.body;    
    try {
      const userServices = new UserService(UserModel);
      const user = await userServices.createUser(email, userid,role);
      return res.status(200).json({
        user,
        message: "User Created",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error Creating User",
        err: JSON.stringify(error),
      });
    }
  },

};

export default UserController;
