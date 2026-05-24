import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        let data = await mongoose.connect(process.env.MONGODB_URL)
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB