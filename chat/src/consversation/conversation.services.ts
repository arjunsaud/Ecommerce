import mongoose from "mongoose";
import { IConversation } from "../model/consversation.model";

export interface IConversationService {
  createConversation(
    users: String[]
  ): Promise<IConversation>;
  getConversation(sender_id: string): Promise<IConversation[]>;
  getAllConversation(
    sender_id: string,
    receiver_id: string
  ): Promise<IConversation[]>;
}

class ConversationService implements IConversationService {
  private _model;

  constructor(_model: mongoose.Model<IConversation>) {
    this._model = _model;
  }

  async createConversation(
    users:String[],
  ): Promise<IConversation> {
    // console.log(users);
    
    const conversation = await this._model.find({
      users: { $all: [users[0], users[1]] },
    });           
    if(conversation.length===0){
      const createmessage = await this._model.create({
        users:[users[0],users[1]],
      });
      return createmessage;
    }else{
      return conversation[0];
    }
  }

  async getConversation(sender_id: string): Promise<IConversation[]> {
    const message = await this._model.find({
      users: { $in: [sender_id] },
    });
    return message;
  }

  async getAllConversation(
    sender_id: string,
    receiver_id: string
  ): Promise<IConversation[]> {
    const message = await this._model.find({
      users: { $all: [sender_id, receiver_id] },
    });
    return message;
  }
}

export default ConversationService;
