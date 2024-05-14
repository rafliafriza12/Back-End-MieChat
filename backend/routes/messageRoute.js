import express from "express";
import { createMessage, getMessages } from "../controllers/messagesController.js";

const messageRouter = express.Router();

messageRouter.get("/:conversationId", getMessages);
messageRouter.post("/", createMessage);

export default messageRouter;