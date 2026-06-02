import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    room: {
        type: String,
        required: false
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
    },
    image:{
        type: String,
    }



}, { timestamps: true })

const MessageModel = mongoose.model("MessageModel", messageSchema)

export default MessageModel