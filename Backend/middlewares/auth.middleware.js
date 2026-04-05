import jwt from 'jsonwebtoken';
export const auth=async(req,res,next)=>{
const {token}=req.headers;
if(!token){
res.status(401).json({message:"please log in first becouse there is no token"})
}
try{
    const decoded=jwt.verify(token, "MarwaKey");
    req.user=decoded;
    next();

}
catch{
return res.status(401).json({message:"Token is not vaild"})
}
}