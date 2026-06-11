import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import connectDB from "./database.js";
import authRouter from "./router/userRouter.js";
import { Server } from "socket.io";
import http from "http"
import { connectionIO } from "./controller/socket.js";
import fs from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), 'public');



dotenv.config()
const port = process.env.PORT || 5000;
const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.43.163:5173", "https://onlyplus.fun","https://www.onlyplus.fun"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}))


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://192.168.43.163:5173", "https://onlyplus.fun","https://www.onlyplus.fun"],
        methods: ["GET", "POST"],
        credentials: true
    }
})





app.use(cookieParser())
app.use(express.json())

app.use(authRouter)

connectionIO(io)



server.listen(port, () => {
    connectDB()
    console.log(`server is listen ${port}`)
})