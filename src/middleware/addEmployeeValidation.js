import Joi from "joi";
import joi from "joi";

const addEmployeeValidation=(req,res,next)=>{

    const Schemas=Joi.object().keys({
        Name: Joi.string().min(3).max(50).required(),
        NationalId:Joi.string().min(16).max(16).required(),
        PhoneNumber: Joi.string().required(),
        email:Joi.string().email({ minDomainSegments: 2 }).required(),
        Position:Joi.string().required(),
        DoB:joi.date().raw().required(),
       
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

export default addEmployeeValidation;