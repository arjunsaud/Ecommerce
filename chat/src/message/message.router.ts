import express from 'express';

import MessageController from './message.controller';
const messageRouter = express.Router();

messageRouter.get('/:conversation',MessageController.getmessage)
messageRouter.post('/',MessageController.createmessage)


export default messageRouter