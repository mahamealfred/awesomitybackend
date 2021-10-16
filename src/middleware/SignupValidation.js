import Joi from "joi";
import joi from "joi";

const SignupValidation=(req,res,next)=>{

    const Schemas=Joi.object().keys({
        Name: Joi.string().min(3).max(50).required(),
        NationalId:Joi.string().min(16).max(16).required(),
        PhoneNumber: Joi.string().required(),
        email:Joi.string().email({ minDomainSegments: 2 }).required(),
        DoB:joi.date().raw().required(),
        password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    const { error} =Schemas.validate(req.body);
    if(error){
        return res.status(400).json({
            status: 400,
            error: error.details[0].message,
        });
    }
    next();
};

export default SignupValidation;