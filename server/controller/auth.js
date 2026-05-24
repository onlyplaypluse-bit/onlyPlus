import User from "../models/userSchema.js";
import bcrypt from "bcrypt"
import genToken from "./token.js";
import MessageModel from "../models/message.js";
import uploadOnCloudinay from "./cloudinary.js";
export const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "Please fill all details" })
        }


        const existEmail = await User.findOne({ email })

        if (existEmail) {
            return res.status(400).json({ message: "Email already exist" })
        }

        const existUserName = await User.findOne({ userName })

        if (existUserName) {
            return res.status(400).json({ message: "User name already exist" })
        }

        const hashPass = await bcrypt.hash(password, 10)



        const createdUser = await User.create({
            userName,
            email,
            password: hashPass,
            // image
        })

        let token = await genToken(createdUser._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
            secure: false
        })

        return res.status(201).json(createdUser)
    } catch (error) {
        return res.status(500).json({ message: "Internal SignUp error" })
    }
}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: "Please fill all details" })
        }

        const existUserName = await User.findOne({ userName })

        if (!existUserName) {
            return res.status(400).json({ message: "User name not exist" })
        }

        const compare = await bcrypt.compare(password, existUserName.password)
        if (!compare) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        let token = await genToken(existUserName._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
            secure: false
        })
        return res.status(200).json(existUserName)
    } catch (error) {
        return res.status(500).json({ message: "Internal Login error" })
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout successfull" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Logout error" })
    }
}


export const getCurrentUser = async (req, res) => {
    try {
        let userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "User Id not found" })
        }

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: "Internal get current user error" })

    }
}

export const getAllUsers = async (req, res) => {
    try {
        let userId = req.userId
        const user = await User.find({ _id: { $ne: userId } }).select("-password")
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: "Internal get all user error" })
    }
}


export const searchUser = async (req, res) => {
    try {
        let { userName } = req.query

        if (!userName) {
            return res.status(400).json({ message: "Username query parameter is required" });
        }
        const users = await User.find({ userName: { $regex: userName, $options: "i" } }).select("-password")
        if (users.length === 0) {
            return res.status(404).json({ message: "User Name not found" });
        }
        return res.status(200).json(users)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal search all user error" })

    }
}



export const paramsUser = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "id not found" });
        }
        const user = await User.findById(id).select("-password")

        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }

        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal params all user error" })

    }
}


export const getHistory = async (req, res) => {
    try {
        let { id } = req.params;
        const chathistory = await MessageModel.find({ room: id }).sort({ createdAt: 1 })
        return res.status(200).json(chathistory)

    } catch (error) {
        console.log("Database se history nikalne me error aaya:", error);
        return res.status(500).json({ error: "Server error, history nahi mil saki" });
    }
}


export const profileUpdate = async (req, res) => {
    try {
        let userId = req.userId;
        let { userName } = req.body;


        if (!userId) {
            return res.status(400).json({ message: "userId not found" });
        }

        let image = ""
        if (req.file) {
            console.log("req.file checking", req.file)
            image = await uploadOnCloudinay(req.file.path)
            console.log("req.file.path checking", req.file.path)
        }
        const user = await User.findByIdAndUpdate(userId, {
            userName,
            image
        }, { returnDocument: 'after' })

        return res.status(200).json(user)

    } catch (error) {
        console.log("profile update error", error);
        return res.status(500).json({ error: "profile update error" });
    }
}


export const deleteChat = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "id not found" });
        }

        const user = await MessageModel.deleteMany({ room: id })

        if (!user) {
            return res.status(404).json({ message: "User already delete" });
        }
        return res.status(200).json({ message: "User Chat successfully delete " });
    } catch (error) {
        console.log("Delete error:", error);
        return res.status(500).json({ error: "Server error while deleting" });
    }
}




let cachedMatches = null;
let lastFetchedTime = 0;
const CACHE_DURATION = 3 * 60 * 1000


export const getCurrentMatch = async (req, res) => {
    let currentTime = Date.now()
    try {

        if (!cachedMatches || (currentTime - lastFetchedTime > CACHE_DURATION)) {
            console.log("Fetching fresh data from CricAPI...");

            // const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=6807ad28-e924-4dbd-8517-c66d56b6c9af&offset=0")

            const response = await fetch( `https://api.cricapi.com/v1/currentMatches?apikey=${process.env.CRIC_API_KEY}&offset=0`);

            const resData = await response.json()

            console.log("--- CricAPI Raw Response Start ---");
            // console.log(resData);
            console.log("--- CricAPI Raw Response End ---");

            if (resData && resData.status === "failure") {
                console.log("CricAPI Failed Reason:");

                lastFetchedTime = currentTime

                res.status(200).json({
                    success: false,
                    message: resData.reason || "API limit exceeded",
                    data: cachedMatches || []
                })
            }


            if (resData && resData.status === "success") {
                cachedMatches = resData.data
                lastFetchedTime = currentTime;
            }
        } else {
            console.log("Serving from backend memory (Saved API Hit!)");
        }


        return res.status(200).json({
            success: true,
            data: cachedMatches || []
        });


    } catch (error) {

        console.error("Backend Controller Error:", error.message);

        lastFetchedTime = currentTime;

        return res.status(500).json({
            success: false,
            data: cachedMatches || []
        });

    }
}


















