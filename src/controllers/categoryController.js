const slugfield = require("../helpers/slugfield");
const Category = require("../models/category");
const {APIError, UniqueValueError} = require("../utils/errors");
const Response = require("../utils/resposne");

async function findCategoryById(categoryId,res){
    const category=await Category.findById(categoryId);
    if(!category){
        return new Response(null,`No category found with category ID "${categoryId}". Please chek ID number`).error404(res);
    };
    return category;
};

exports.post_category=async (req,res)=>{
    const {name}=req.body;
    const url=slugfield(name);
    await Category.create({name: name.toLowerCase(), url: url})
    .then((data)=>{
        return new Response(data, "Category created successfully").created(res);
    })
    .catch(err=>{
        if(err.name=="MongoServerError" && err.code==11000){
            throw new UniqueValueError(null,name);
        }
        throw new APIError(`An occurred error while creating category. Error: ${err}`);
        
    });

};
exports.put_category=async(req,res)=>{
    const categoryId=req.params.categoryId;
    
    const category=await findCategoryById(categoryId,res);

    const {name}=req.body;
    await Category.findByIdAndUpdate(category._id,{
        name: name.toLowerCase(),
        url: slugfield(name)
    },{new: true})
    .then((data)=>{
        console.log(data)
        return new Response(data, `The category named "${category.name}" has been successfully updated`).success(res);
    })
    .catch(err=>{
        if(err.name=="MongoServerError" && err.code==11000){
            throw new UniqueValueError(null,name);
        }
        console.log(err)
        throw new APIError(`An error occurred while category edit. Error: ${err}`);
    })
};
exports.delete_category=async (req,res)=>{
    const categoryId=req.params.categoryId;

    const category=await findCategoryById(categoryId,res);

    await Category.findByIdAndDelete(category)
    .then(()=>{
        return new Response(null, `Category named "${category.name}" deleted successfully`).success(res);
    })
    .catch(err=>{
        throw new APIError(`An error occurred while deleting category. Error: ${err}`,500);
    })
}
exports.get_category=async (req,res)=>{
    const categoryId=req.params.categoryId;

    const category=await findCategoryById(categoryId,res);

    return new Response(category, null).success(res);
};
exports.get_categories=async (req,res)=>{
    const categories=await Category.find();

    return new Response(categories, "All categories listed successfully").success(res);
};
