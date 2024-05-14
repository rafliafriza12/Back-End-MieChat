import conversationsModel from "../models/conversationsModel.js";
import messagesModel from "../models/messagesModel.js";
import usersModel from "../models/usersModel.js";

export const createMessage = async (req, res) => {
    try {
        const { senderId, receiverId = '', message, conversationId } = req.body;
        const newMessage = new messagesModel(req.body);
        if(!senderId || !message) return res.status(400).json({message: "Sender ID and message are required."});
        if(conversationId === 'new' && receiverId) {
            const newConversation = new conversationsModel({members: [senderId, receiverId]});
            await newConversation.save();
            const newMessage = new messagesModel({conversationId: newConversation._id, senderId, message});
            await newMessage.save();
            return res.status(200).send("Message sent successfully.");
        } else if (!conversationId && !receiverId) {
            return res.status(400).find({message: "Please fill all required fields."});
        }
        await newMessage.save();
        res.status(200).json(newMessage);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        if (conversationId === 'new') {
            return res.status(200).json([]);
        }
        const messages = await messagesModel.find({ conversationId });
        const messageUserData = Promise.all(messages.map(async (message) => {
            const user = await usersModel.findById(message.senderId);
            return { user: {id: user._id, email: user.email, fullName: user.fullName}, message: message.message };
        }));
        res.status(200).json(await messageUserData);
    } catch (err) {
        res.status(500).json(err);
    }
};