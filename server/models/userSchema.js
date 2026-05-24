import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    verify:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"user"
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User