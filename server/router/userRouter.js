import express from "express"
import { deleteChat, getAllUsers, getCurrentMatch, getCurrentUser, getHistory, login, logOut, paramsUser, profileUpdate, searchUser, signup } from "../controller/auth.js"
import { isAuth } from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"

const authRouter = express.Router()


authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)

authRouter.get("/get-current-user",isAuth,getCurrentUser)

authRouter.get("/get-all-users",isAuth,getAllUsers)
authRouter.get("/search-user",searchUser)

authRouter.get("/get-user/:id",paramsUser)

authRouter.get("/get-message/:id",getHistory)

authRouter.post("/profile-update",isAuth,upload.single("image"),profileUpdate)

authRouter.delete("/delete/:id",deleteChat)

authRouter.get("/get-match",getCurrentMatch)




 


export default authRouter