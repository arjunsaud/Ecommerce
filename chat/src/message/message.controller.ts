import { Request, Response } from "express";
import MessageModel from "../model/message.model";
import MessageService from "./message.services";
import mongoose from "mongoose";
import ConversationService from "../consversation/conversation.services";
import ConversationModel from "../model/consversation.model";
import socketService from "../utils/SocketService";

const MessageController = {
  getmessage: async (req: Request, res: Response) => {
    const {conversation}= req.params
    try {
      const messageServices = new MessageService(MessageModel);
      const message = await messageServices.getMessage(conversation);
      return res.status(200).json({
        message
      });
    } catch (error) {
      return res.status(400).json({
        error
      });
    }
  },

  createmessage: async (req: Request, res: Response) => {
    const message=req.body.message
    const conversation= new mongoose.Types.ObjectId(req.body.conversation)
    const sender_id= new mongoose.Types.ObjectId(req.body.sender_id)

    try {
      const messageServices = new MessageService(MessageModel);
      const messages = await messageServices.createMessage(
        message,
        conversation,
        sender_id
      )    
      const msg:any={
        message,
        conversation,
        sender_id
      }
      const conversationService=new ConversationService(ConversationModel)
      const conversations=await conversationService.getConversationById(conversation)
      const users = conversations[0]?.users;
      users?.map((user) => {
        if (user.toString() !== sender_id.toString()) {                            
          const client = socketService.getClient(user.toString());
         client?.socket.send(JSON.stringify(msg))
        }
      });
      
      return res.status(200).json({
        messages,
        message:"Message Created"
      });

    } catch (error) {          
      res.status(400).json({
        message: "unable to create a message",
        error,
      });      
    }
  },
};

export default MessageController;
