import conversationsModel from "../models/conversationsModel.js";
import usersModel from "../models/usersModel.js";

export const createConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const newConversation = new conversationsModel({
            members: [senderId, receiverId],
        });
        await newConversation.save();
        res.status(200).json(newConversation);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getConversation = async (req, res) => {
    try {
        const conversations = await conversationsModel.find({
            members: { $in: [req.params.userId, req.params.receiverId] },
        });
        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== req.params.userId);
            const user = await usersModel.findById(receiverId);
            return { user: {id: user._id, email: user.email, fullName: user.fullName}, conversationId: conversation._id };
        }));
        res.status(200).json(await conversationUserData);
    } catch (err) {
        res.status(500).json(err);
    }
}