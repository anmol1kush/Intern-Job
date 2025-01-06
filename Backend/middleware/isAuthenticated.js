import  jwt  from "jsonwebtoken";

const isAuthenticated=  async (req,res,next)=>{
    try {
        const token= req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "User not Authenticated",
                success: false,
            })
        }
        const decoded=   jwt.verify( token,process.env.SECRET_KEY);
        if(!decoded){
            return res.status(401).json({
                message: "Invalid Token",
                success: false,
            })
        }
        req.id= decoded.userID;
        next();
    } catch (error) {
        
    }
}
export default isAuthenticated;