// change cloudinary API 

import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinay = async (path) => {
    try {
        let upload = await cloudinary.uploader.upload(path)
        console.log(upload)
        fs.unlinkSync(path)
        return (await upload).secure_url
    } catch (error) {
        console.log(error)
        fs.unlinkSync(path)
    }
}

export default uploadOnCloudinay