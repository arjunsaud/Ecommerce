import mongoose from "mongoose";
import { IMessage } from "../model/message.model";

export interface IMessageService{
    createMessage(message:string,conversation:mongoose.Types.ObjectId,sender_id:mongoose.Types.ObjectId):Promise<IMessage>,
    getMessage(conversation:string):Promise<IMessage[]>
}

class MessageService implements IMessageService{
    private _model

    constructor(_model:mongoose.Model<IMessage>){
        this._model=_model
    }

    async createMessage(message: string, conversation: mongoose.Types.ObjectId,sender_id:mongoose.Types.ObjectId): Promise<IMessage> {               
        const createmessage=await this._model.create({
            message,
            conversation,
            sender_id,
        })       
        return createmessage
    }

    async getMessage(conversation:string): Promise<IMessage[]> {
        const message=await this._model.find({
            conversation
        })
        return message
    }
} 


export default MessageService