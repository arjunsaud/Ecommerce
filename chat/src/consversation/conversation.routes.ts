import express from 'express';

import ConversationController from './conversation.controller';
const conversationRouter = express.Router();

conversationRouter.post('/',ConversationController.createConversation)
conversationRouter.get('/:sender_id',ConversationController.getConversation)

conversationRouter.get('/:sender_id/:receiver_id',ConversationController.getAllConversation)

export default conversationRouter