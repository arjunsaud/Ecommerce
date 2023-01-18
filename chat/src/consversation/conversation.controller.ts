import { Request, Response } from "express";
import ConversationModel from "../model/consversation.model";
import ConversationService from "./conversation.services";
import mongoose from "mongoose";

const ConversationController = {
  getConversation: async (req: Request, res: Response) => {
    const { sender_id } = req.params;
    try {
      const conversationServices = new ConversationService(ConversationModel);
      const conversation = await conversationServices.getConversation(
        sender_id
      );
      return res.status(200).json({
        conversation,
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  },

  getAllConversation: async (req: Request, res: Response) => {
    const { sender_id, receiver_id } = req.params;
    try {
      const conversationServices = new ConversationService(ConversationModel);
      const conversation = await conversationServices.getAllConversation(
        sender_id,
        receiver_id
      );
      return res.status(200).json({
        conversation,
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  },

  createConversation: async (req: Request, res: Response) => {
    let { users } = req.body; 
    try {
      const conversationServices = new ConversationService(ConversationModel);
      const conversation = await conversationServices.createConversation(
        users
      );
      return res.status(200).json({
        conversation,
        message: "Conversation Created",
      });
    } catch (error) {
      console.log(error);
      
      return res.status(400).json({
        message: "unable to create conversation",
        error,
      });
    }
  },
};

export default ConversationController;
