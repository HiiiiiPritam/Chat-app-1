import jwt from 'jsonwebtoken'
import { User } from '../models/Users.js'

const secureRoute = async (req, res, next)=>{
  try {
    const token = req.cookies.jwtChatApp;
    if(!token){
      return res.status(401).json({error:"no token authorization denied"})
    }

    const decoded= jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
      return res.status(401).json({error:"Invalid Token authorization denied"})
    }

    const user= await User.findById(decoded.userId).select("-password");
    if(!user){
      return res.status(401).json({error:"No user found authorization denied"})
    }

    req.user= user;
    next();
  } catch (error) {
    console.log('Error in secure route', error);
    res.status(500).json({
      error:"internal server error"
    })
  }
}

export default secureRoute