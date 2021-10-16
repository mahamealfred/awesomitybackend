import Models from "../database/models";
import { decode } from "../helpers/jwtTokenizer";

const { users } =Models;



const isManager=async (req,res,next)=>{


    const token = req.headers["my-token"];
    if (!token) {
      return res.status(403).json({
        status: 403,
        message: "please login",
      });
    }
    const payload=await decode(token);
    const { email } =payload;

    const found=await users.findOne({ where: { email}});
    if(!found){
        return res.status(404).json({
            status:404,
            message: "User not found",
        });
    }
    if(found.Position =="MANAGER"){
        return next();
    }
    else{
        return res.status(403).json({
            status:403,
            message: "Only Manager allowed",
        });

    }
}
export default isManager;