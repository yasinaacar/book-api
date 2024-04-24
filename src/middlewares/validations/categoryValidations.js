const Joi=require("joi");
const {APIError} = require("../../utils/errors");
const Response=require("../../utils/resposne");
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
        const categoryIdFromParams=req.params.categoryId;
        const categoryIdFromBody=req.body.categoryId;
        try {
            await Joi.object({
                name: Joi.string().trim().min(minCharacter).max(maxCharacter).required().messages({
                    "string.base" : "Category name can only contain letters",
                    "string.empty" : "Category name can't be empty",
                    "string.min" : `Category name length must be at least ${minCharacter} character`,
                    "string.min" : `Category name length must be maximum of ${maxCharacter} character`,
                    "string.required" : "Category name can't be empty"
                }),
                categoryId: Joi.string().trim().required().messages({
                    "string.base" : "Category Id must be string format",
                    "string.empty": "Category Id can't be empty. You need to submit the category ID along with parameters and body for editing",
                    "string.required" : "Category Id can't be empty. You need to submit the category ID along with parameters and body for editing"
                })
            }).validateAsync(req.body);
            if(!categoryIdFromParams){
                return new Response(undefined, "You need to submit the category ID along with parameters for editing").error400(res);
            }else if(categoryIdFromParams != categoryIdFromBody){
                return new Response(undefined, "Category Id's must be the same in the body and parameter.").error400(res);
            }
        } catch (err) {
            if(err.name=="ValidationError"){
                throw new APIError(err.details[0].message, 400);
            }
            throw new APIError("An error occured while sending put request", undefined, 400);
    
        }
        next();
    };
    static delete=async (req,res,next)=>{
        const categoryIdFromParams=req.params.categoryId;
        const categoryIdFromBody=req.body.categoryId;
        try {
            await Joi.object({
                categoryId: Joi.string().trim().required().messages({
                    "string.base" : "Category Id must be string format",
                    "string.empty": "Category Id can't be empty. You need to submit the category ID along with parameters and body for deleting",
                    "string.required" : "Category Id can't be empty. You need to submit the category ID along with parameters and body for deleting"
                })
            }).validateAsync(req.body);
            if(!categoryIdFromParams){
                return new Response(undefined, "You need to submit the category ID along with parameters for editing").error400(res);
            }else if(categoryIdFromParams != categoryIdFromBody){
                return new Response(undefined, "Category Id's must be the same in the body and parameter.").error400(res);
            }
        } catch (err) {
            if(err.name=="ValidationError"){
                throw new APIError(err.details[0].message, 400);
            }
            throw new APIError("An error occured while sending put request", undefined, 400);
    
        }
        next();
    };
};

module.exports=ValidateCategory;