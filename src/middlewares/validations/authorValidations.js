const {APIError}=require("../../utils/errors");
const Joi=require("joi");
const Response = require("../../utils/resposne");
let minCharacter= 4;
let maxCharacter=150;
function isFullname(fullname,res){
    if(!fullname){
        return new Response(undefined, `Fullname is not provide`).error400(res);
    }
    const splitedName=fullname.split(" ")
    if(splitedName.length<2){
        return new Response(undefined, "Please leave a space between author name and surname").error400(res);
    }
}

class ValidateAuthor{
    constructor(){}

    static create=async (req,res,next)=>{
        const fullname=req.body.fullname;
        try {
            await Joi.object({
                fullname: Joi.string().min(minCharacter).max(maxCharacter).trim().required().messages({
                    "string.base": "Author fullname can only contain letters",
                    "string.empty" : "Author fullname can't be empty",
                    "string.required" : "Author fullname can't be empty",
                    "string.min" : `Author fullname length must be at least ${minCharacter} character`,
                    "string.max" : `Author fullname length must be maximum of ${maxCharacter} character`,
                }),
                biography: Joi.string().trim().max(750).message({
                    "string.base": "Author biography can only contain letters",
                    "string.max" : `Author biography length must be maximum of 750 character`,
                })
            }).validateAsync(req.body)
            //check name and surname value basiclly
            isFullname(fullname,res);
        } catch (err) {
            if(err.name="ValidationError"){
                throw new APIError(err.details[0].message, "JoiValidationError", 400);
            }
            throw new APIError("An error occurred while sending values to author creation", "ValidateAuthorError", 400);
        }
        next();
    };
    static edit=async (req,res,next)=>{
        const fullname=req.body.fullname;
        const authorIdFromParams=req.params.authorId;
        const authorIdFromBody=req.body.authorId;
        
        try {
            if(!authorIdFromParams || !authorIdFromBody){
                return new Response(undefined, "You need to submit the author ID along with parameters and body for editing").error400(res);
            }else if(authorIdFromParams!=authorIdFromBody){
                return new Response(undefined, "Author Id's must be the same in the body and parameter.").error400(res);
    
            }
            await Joi.object({
                fullname: Joi.string().min(minCharacter).max(maxCharacter).trim().required().messages({
                    "string.base": "Author fullname can only contain letters",
                    "string.empty" : "Author fullname can't be empty",
                    "string.required" : "Author fullname can't be empty",
                    "string.min" : `Author fullname length must be at least ${minCharacter} character`,
                    "string.max" : `Author fullname length must be maximum of ${maxCharacter} character`,
                }),
                biography: Joi.string().trim().max(750).message({
                    "string.base": "Author biography can only contain letters",
                    "string.max" : `Author biography length must be maximum of 750 character`,
                }),
                authorId: Joi.string().trim().required().messages({
                    "string.base" : "Author Id must be string type",
                    "string.empty": "Author Id can't be empty",
                    "string.required": "Author Id can't be empty",
                })
            }).validateAsync(req.body);
            //check name and surname value basicly
            isFullname(fullname,res);
        } catch (err) {
            if(err.name="ValidationError"){
                throw new APIError(err.details[0].message, "JoiValidationError", 400);
            }
        }
        next();
    };
    static delete=async (req,res,next)=>{
        const authorIdFromParams=req.params.authorId;
        const authorIdFromBody=req.body.authorId;
        
        try {
            if(!authorIdFromParams || !authorIdFromBody){
                return new Response(undefined, "You need to submit the author ID along with parameters and body for editing").error400(res);
            }else if(authorIdFromParams!=authorIdFromBody){
                return new Response(undefined, "Author Id's must be the same in the body and parameter.").error400(res);
    
            }
            await Joi.object({
                authorId: Joi.string().trim().required().messages({
                    "string.base" : "Author Id must be string type",
                    "string.empty": "Author Id can't be empty",
                    "string.required": "Author Id can't be empty",
                })
            }).validateAsync(req.body);

        } catch (err) {
            if(err.name="ValidationError"){
                throw new APIError(err.details[0].message, "JoiValidationError", 400);
            }
            throw new APIError("An error occured while sending delete request", undefined, 400);
        }
        next();
    };
};

module.exports=ValidateAuthor