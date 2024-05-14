import express from "express";
import { registerUser } from "../controllers/usersController.js";
import { createConversation, getConversation } from "../controllers/conversationsController.js";

const conversationRouter = express.Router();

conversationRouter.get("/:userId/:receiverId", getConversation);
conversationRouter.post("/", createConversation);

export default conversationRouter;