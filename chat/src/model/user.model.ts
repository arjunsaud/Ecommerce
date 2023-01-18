import mongoose from "mongoose";

export interface IUser {
  email: string;
  userid : string;
  role:string;
}

export const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique:true
  },
  userid:{
    type:String,
    required:true,
    unique:true
  },
  role:{
    type:String,
    required:true
  }
});

 const UserModel = mongoose.model<IUser>("user", UserSchema);

 export default UserModel;