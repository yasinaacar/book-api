const Joi=require("joi");
const {APIError}=require("../../utils/errors");
const Response=require("../../utils/resposne");

class ValidateBook{
    constructor(){};

    static create=async (req,res,next)=>{
        try {
            await Joi.object({
                name: Joi.string().trim().required().messages({
                    "string.base" : "Book name can only contain letters",
                    "string.empty" : "name can't be empty",
                    "string.required" : "name can't be empty"
                }),
                edition: Joi.number().integer().min(1).default(1).required().messages({
                    "number.base": "edition must be a number",
                    "number.integer": "edition must be an integer",
                    "number.min": "edition must be at least 1",
                    "any.required": "edition is required. İs not be empty" 
                }),
                editionYears: Joi.object({
                    firstEdition: Joi.number().integer().messages({
                      "number.base": "First edition must be a number",
                      "number.integer": "First edition must be an integer",
                      "any.required": "First edition is required"
                    }),
                    lastEdition: Joi.number().integer().messages({
                      "number.base": "Last edition must be a number",
                      "number.integer": "Last edition must be an integer",
                      "any.required": "Last edition is required"
                    })
                }),
                language: Joi.string().trim().default('Türkçe-TR').min(2).required().messages({
                    "string.base": "Language must be a string",
                    "string.trim": "Language must not have leading or trailing whitespace",
                    "string.min": "Language must be at least 2 characters long",
                    "any.required": "Language is required"
                }),
                page: Joi.number().integer().min(1).required().messages({
                    "number.base": "Page must be a number",
                    "number.integer": "Page must be an integer",
                    "number.min": "Page must be at least 1",
                    "any.required": "Page is required"
                }),
                barcode: Joi.string().required().trim().messages({
                    "string.base": "Barcode must be a string",
                    "any.required": "Barcode is required",
                    "string.empty": "Barcode cannot be empty"
                }),
                price: Joi.number().min(0).required().messages({
                    "number.base": "Price must be a number",
                    "number.min": "Price cannot be negative",
                    "any.required": "Price is required"
                }),
                stock: Joi.number().min(0).default(0).messages({
                    "number.base": "Stock must be a number",
                    "number.min": "Stock cannot be negative",
                    "any.default": "Default value for stock is 0"
                }),
                authorIds: Joi.array().items(Joi.string().trim()).messages({
                    "array.base": "Authors must be an array",
                    "string.base": "Author id must be a string",
                    "string.empty": "Author id cannot be empty"
                }),
                categoryIds: Joi.array().items(Joi.string().trim()).messages({
                    "array.base": "Categories must be an array",
                    "string.base": "Category id must be a string",
                    "string.empty": "Category id cannot be empty"
                }),
                publisherId: Joi.string().trim().messages({
                    "string.base": "Publisher id must be a string",
                    "string.empty": "Publisher id cannot be empty"
                })
            }).validateAsync(req.body);
            
        } catch (err) {
            if(err.name=="ValidationError"){
                throw new APIError(err.details[0].message, "JoiValidationError", 400);
            }
            throw new APIError("An error occurred while send values to book create");
        }
        next();
    };
    static edit=async (req,res,next)=>{
        const bookIdFromParams=req.params.bookId;
        const bookIdFromBody=req.body.bookId;
        try {
            await Joi.object({
                name: Joi.string().trim().required().messages({
                    "string.base" : "Book name can only contain letters",
                    "string.empty" : "name can't be empty",
                    "string.required" : "name can't be empty"
                }),
                edition: Joi.number().integer().min(1).default(1).required().messages({
                    "number.base": "edition must be a number",
                    "number.integer": "edition must be an integer",
                    "number.min": "edition must be at least 1",
                    "any.required": "edition is required. İs not be empty" 
                }),
                editionYears: Joi.object({
                    firstEdition: Joi.number().integer().messages({
                      "number.base": "First edition must be a number",
                      "number.integer": "First edition must be an integer",
                      "any.required": "First edition is required"
                    }),
                    lastEdition: Joi.number().integer().messages({
                      "number.base": "Last edition must be a number",
                      "number.integer": "Last edition must be an integer",
                      "any.required": "Last edition is required"
                    })
                }),
                language: Joi.string().trim().default('Türkçe-TR').min(2).required().messages({
                    "string.base": "Language must be a string",
                    "string.trim": "Language must not have leading or trailing whitespace",
                    "string.min": "Language must be at least 2 characters long",
                    "any.required": "Language is required"
                }),
                page: Joi.number().integer().min(1).required().messages({
                    "number.base": "Page must be a number",
                    "number.integer": "Page must be an integer",
                    "number.min": "Page must be at least 1",
                    "any.required": "Page is required"
                }),
                barcode: Joi.string().required().trim().messages({
                    "string.base": "Barcode must be a string",
                    "any.required": "Barcode is required",
                    "string.empty": "Barcode cannot be empty"
                }),
                price: Joi.number().min(0).required().messages({
                    "number.base": "Price must be a number",
                    "number.min": "Price cannot be negative",
                    "any.required": "Price is required"
                }),
                stock: Joi.number().min(0).default(0).messages({
                    "number.base": "Stock must be a number",
                    "number.min": "Stock cannot be negative",
                    "any.default": "Default value for stock is 0"
                }),
                authors: Joi.array().items(Joi.string().trim().required()).required().messages({
                    "any.required": "At least one author is required",
                    "array.base": "Authors must be an array",
                    "string.base": "Author id must be a string",
                    "string.empty": "Author id cannot be empty"
                }),
                categories: Joi.array().items(Joi.string().trim().required()).required().messages({
                    "any.required": "At least one category is required",
                    "array.base": "Categories must be an array",
                    "string.base": "Category id must be a string",
                    "string.empty": "Category id cannot be empty"
                }),
                publisher: Joi.string().trim().required().messages({
                    "any.required": "Publisher is required",
                    "string.base": "Publisher id must be a string",
                    "string.empty": "Publisher id cannot be empty"
                }),
                bookId: Joi.string().trim().required().messages({
                    "string.base": "bookId must be a string",
                    "any.required": "bookId is required",
                })
            }).validateAsync(req.body);
            if(!bookIdFromParams){
                return new Response(undefined, "You need to submit the Book ID along with parameters for editing").error400(res);
            }else if(bookIdFromParams != bookIdFromBody){
                return new Response(undefined, "Book Id's must be the same in the body and parameter.").error400(res);
            }
        } catch (err) {
            if(err.name=="ValidationError"){
                throw new APIError(err.details[0].message, "JoiValidationError", 400);
            }
            throw new APIError("An error occurred while send values to book create");
        }
        next();
    };
    static delete=async (req,res,next)=>{
        const bookIdFromParams=req.params.bookId;
        const bookIdFromBody=req.body.bookId;
        try {
            await Joi.object({
                bookId: Joi.string().trim().required().messages({
                    "string.base": "bookId must be a string",
                    "any.required": "bookId is required",
                })
            }).validateAsync(req.body);
            if(!bookIdFromParams){
                return new Response(undefined, "You need to submit the Book ID along with parameters for deleting").error400(res);
            }else if(bookIdFromParams != bookIdFromBody){
                return new Response(undefined, "Book Id's must be the same in the body and parameter.").error400(res);
            }
        } catch (err) {
            if(err.name=="ValidationError"){
                throw new APIError(err.details[0].message, "JoiValidationError", 400);
            }
            throw new APIError("An error occurred while send values to book create");
        }
        next();
    };
};

module.exports=ValidateBook;