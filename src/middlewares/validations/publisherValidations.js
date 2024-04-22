const {APIError}=require("../../utils/errors");
const Joi=require("joi");
let minCharacter=2;
let maxCharacter=250;
class ValidatePublisher{
    constructor(){};

    static create=async (req,res,next)=>{
        try {
            await Joi.object({
                name: Joi.string().trim().min(minCharacter).max(maxCharacter).required().messages({
                    "string.base" : "Publisher name can only contain letters",
                    "string.empty" : "Publisher name can't be empty",
                    "string.required": "Publisher name can't be empty",
                    "string.min" : `Publisher name length must be at least ${minCharacter} character`,
                    "string.max" : `Publisher name length must be maximum ${maxCharacter} character`
                }),
                email : Joi.string().email().trim().messages({
                    "string.base": "Email type error from publisher",
                    "string.empty": "Publisher email can not be empty",
                    "string.email": "Enter a valid email address ",
                }),
                phone: Joi.number().messages({
                    "number.base": "Phone number can only contain numbers",
                }),
                address: Joi.string().messages({
                    "string.base" : "Publisher adress can only contain letters",
                })
            }).validateAsync(req.body);
        } catch (err) {
            console.log(err)
            if(err.name=="ValidationError"){
                throw new APIError(err.details[0].message);
            }
        }
        next();
    };
    static edit=async (req,res,next)=>{
        try {
            await Joi.object({
                name: Joi.string().trim().min(minCharacter).max(maxCharacter).required().messages({
                    "string.base" : "Publisher name can only contain letters",
                    "string.empty" : "Publisher name can't be empty",
                    "string.required": "Publisher name can't be empty",
                    "string.min" : `Publisher name length must be at least ${minCharacter} character`,
                    "string.max" : `Publisher name length must be maximum ${maxCharacter} character`
                }),
                email : Joi.string().email().trim().messages({
                    "string.base": "Email type error from publisher",
                    "string.empty": "Publisher email can not be empty",
                    "string.email": "Enter a valid email address ",
                }),
                phone: Joi.number().messages({
                    "number.base": "Phone number can only contain numbers",
                }),
                address: Joi.string().messages({
                    "string.base" : "Publisher adress can only contain letters",
                })
            }).validateAsync(req.body);
        } catch (err) {
            console.log(err)
            if(err.name=="ValidationError"){
                throw new APIError(err.details[0].message);
            }
        }
        next();
    };
    // static delete=async (req, res, next)=>{
    //     try {
    //         const publisherIdFromBody =req.body.publisherId;
    //         if(!publisherIdFromParams || !publisherIdFromBody){
    //             let missingValueFrom;
    //             publisherIdFromParams==undefined ? missingValueFrom="params" : missingValueFrom="body";
    //             throw new APIError(`To delete publisher must send to publisher id with ${missingValueFrom}`, "Missing Value", 400);
    //         };
    //     } catch (err) {
    //         if(err.name=="Missing Value"){
    //             throw new APIError(err.message, 400);
    //         }
    //     }
    //     next();
    // }
};

module.exports=ValidatePublisher;