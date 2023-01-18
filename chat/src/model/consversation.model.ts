import mongoose, { Schema } from "mongoose";

export interface IConversation {
  users: String[];
}

export const ConversationSchema = new mongoose.Schema<IConversation>(
  {
    users: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ConversationModel = mongoose.model<IConversation>(
  "conversation",
  ConversationSchema
);

export default ConversationModel;
