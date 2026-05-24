import jwt from "jsonwebtoken"

const genToken = (userId)=>{
    try {
        let token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    } catch (error) {
        
    }
}

export default genToken