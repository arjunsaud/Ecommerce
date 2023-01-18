import express from "express";
import conversationRouter from "../consversation/conversation.routes";
import messageRouter from "../message/message.router";

import userRouter from "../user/user.router";

const router=express.Router()

router.use("/user",userRouter)
router.use("/message",messageRouter)
router.use("/conversation",conversationRouter)

export default router