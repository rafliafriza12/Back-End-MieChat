import mongoose from "mongoose";

const Conversations = new mongoose.Schema({
    members: {
        type: Array,
        required: true,
    },
})
export default mongoose.model("Conversations", Conversations);