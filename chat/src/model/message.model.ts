import mongoose, { Schema } from "mongoose";
import ConversationModel from "./consversation.model";
import UserModel from "./user.model";

export interface IMessage{
    message:string;
    conversation:mongoose.Types.ObjectId;
    sender_id:mongoose.Types.ObjectId;
}

export const MessageSchema=new mongoose.Schema<IMessage>({
    message:{
        type:String,
        required:true
    },
    conversation:{
        type:Schema.Types.ObjectId,
        ref:ConversationModel,
        required:true,
    },
    sender_id:{
        type:Schema.Types.ObjectId,
        ref:UserModel,
        required:true
    },
},{
    timestamps:true
})


const MessageModel=mongoose.model<IMessage>("message",MessageSchema)

export default MessageModel