import mongoose from "mongoose";

const Messages = new mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    message: {
        type: String,
    }
})

export default mongoose.model("Messages", Messages);