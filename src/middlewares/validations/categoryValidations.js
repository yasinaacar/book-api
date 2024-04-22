const Joi=require("joi");
const {APIError} = require("../../utils/errors");
let minCharacter=2;
let maxCharacter=100;
class ValidateCategory{
    constructor (){}
    
    static create=async(req,res,next)=>{
        try {            
            await Joi.object({
                name: Joi.string().trim().min(minCharacter).max(maxCharacter).required().messages({
                    "string.base" : "Category name can only contain letters",
                    "string.empty" : "Category name can't be empty",
                    "string.min" : `Category name length must be at least ${minCharacter} character`,
                    "string.min" : `Category name length must be maximum of ${maxCharacter} character`,
                    "string.required" : "Category name can't be empty"
                })
            }).validateAsync(req.body)
        } catch (err) {
            throw new APIError(err.details[0].message, 400);
        }
        next();
    };
    static edit=async (req,res,next)=>{
        try {
            await Joi.object({
                name: Joi.string().trim().min(minCharacter).max(maxCharacter).required().messages({
                    "string.base" : "Category name can only contain letters",
                    "string.empty" : "Category name can't be empty",
                    "string.min" : `Category name length must be at least ${minCharacter} character`,
                    "string.min" : `Category name length must be maximum of ${maxCharacter} character`,
                    "string.required" : "Category name can't be empty"
                })
            }).validateAsync(req.body);
            // const categoryIdFromParams=req.params.categoryId;
            // console.log(categoryIdFromParams)
            // if(!categoryIdFromParams){
                
            //     throw new APIError(`To edit the category, the category ID must be sent along with the parameters`,404);
            // }
            // const categoryIdFromBody=req.body.categoryId;
            // if(!categoryIdFromBody){
            //     throw new APIError(`To edit the category, the category ID must be sent along with the body`,404);
            // }

            // if(categoryIdFromParams != categoryIdFromBody){
            //     throw new APIError('To edit the category, categories id must be same from body and params')
            // }

        } catch (err) {
            if(err.name=="ValidationError"){
                throw new APIError(err.details[0].message, 400);
            }
        }
        next();
    }
};

module.exports=ValidateCategory;