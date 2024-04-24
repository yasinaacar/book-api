const {APIError}=require("../../utils/errors");
const Response=require("../../utils/resposne");
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
        const publisherIdFromParams=req.params.publisherId;
        const publisherIdFromBody=req.body.publisherId;
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
                }),
                publisherId: Joi.string().required().trim().messages({
                    "string.base" : "publisherId must be string",
                    "string.empty" : "publisherId can't be empty",
                    "string.required" : "publisherId can't be empty",
                })
            }).validateAsync(req.body);
            if(!publisherIdFromParams){
                return new Response(undefined, "You need to submit the publisherId along with parameters for editing").error400(res);
            }else if(publisherIdFromParams != publisherIdFromBody){
                return new Response(undefined, "publisherId's must be the same in the body and parameter.").error400(res);
            }
        } catch (err) {
            if(err.name=="ValidationError"){
                throw new APIError(err.details[0].message);
            }
            throw new APIError("An error occured while sending put request to publisher edit", undefined, 400);

        }
        next();
    };
    static delete=async (req,res,next)=>{
        const publisherIdFromParams=req.params.publisherId;
        const publisherIdFromBody=req.body.publisherId;
        try {
            await Joi.object({
                publisherId: Joi.string().required().trim().messages({
                    "string.base" : "publisherId must be string",
                    "string.empty" : "publisherId can't be empty",
                    "string.required" : "publisherId can't be empty",
                })
            }).validateAsync(req.body);
            if(!publisherIdFromParams){
                return new Response(undefined, "You need to submit the publisherId along with parameters for editing").error400(res);
            }else if(publisherIdFromParams != publisherIdFromBody){
                return new Response(undefined, "publisherId 's must be the same in the body and parameter.").error400(res);
            }
        } catch (err) {
            if(err.name=="ValidationError"){
                throw new APIError(err.details[0].message);
            }
            throw new APIError("An error occured while sending put request to publisher edit", undefined, 400);

        }
        next();
    };
};

module.exports=ValidatePublisher;