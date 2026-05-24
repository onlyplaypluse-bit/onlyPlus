import jwt from "jsonwebtoken"
export const isAuth = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "Token not found" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(400).json({ message: "Token not verify" })
        }

        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error isAuth" ,error})

    }
}