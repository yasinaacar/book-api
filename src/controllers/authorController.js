const Author=require("../models/author");
const Response=require("../utils/resposne");
const {APIError}=require("../utils/errors");
const fs=require("fs");
const path = require("path");

async function findAuthorById(authorId, res){
    const author=await Author.findById(authorId);

    if(!author){
        return new Response(undefined, `No author found with author id ${authorId}`).error404(res);
    }

    return author;
};

exports.post_author=async (req,res)=>{
    const {fullname, biography}=req.body;
    const authorImg=req.file ? req.file.filename : null;
    await Author.create({
        fullname,
        biography,
        image: authorImg
    })
    .then((author)=>{
        return new Response(author, `Author named '${author.fullname}' created successfully`).created(res);
    })
    .catch(err=>{
        throw new APIError(`An error occurred while creating author. Error: ${err}`, null, 500);
    })
};
exports.put_author=async (req,res)=>{
    const authorId=req.params.authorId;
    const author=await findAuthorById(authorId, res);
    
    const {fullname, biography}=req.body;
    
    let authorImg=author.image;
    if(req.file){
        authorImg=req.file.filename;
    }

    await Author.findByIdAndUpdate(author._id,{
        fullname,
        biography: !biography ? null : biography,
        image: authorImg
    },{new: true})
    .then((data)=>{
        if(req.file && author.image){
            const rootDir=path.dirname(require.main.filename);
            fs.unlink(path.join(rootDir, `/src/public/uploads/images/authors/${author.image}`),(err)=>{
                if(err){
                    console.log(`Author edited but old image couldn't delete. Image: ${author.image} ERROR: ${err}`);
                }
            })
        }
        return new Response(data, `Author named ${data.fullname} updated successfully`).success(res);
    })
    .catch(err=>{
        throw new APIError(`An error occurred while updating author. Error : ${err}`, undefined, 500);
    });

};
exports.delete_author=async (req,res)=>{
    const authorId=req.params.authorId;
    const author=await findAuthorById(authorId, res);

    await Author.findByIdAndDelete(author._id)
    .then(()=>{
        if(author.image){
            const rootDir=path.dirname(require.main.filename);
            fs.unlink(path.join(rootDir,`/src/public/uploads/images/authors/${author.image}`),(err)=>{
                if(err){
                    console.log(`Author is deleted successfully but image couldn't remove. Image: ${author.image} ERROR: ${err}`)
                }
            })
        }
        return new Response(undefined, `Author named ${author.fullname} deleted successfully `).success(res);
    })
    .catch(err=>{
        throw new APIError(`An error occurred while deleting author. Error: ${err}`,undefined, 500);
    });
};
exports.get_author=async (req,res)=>{
    const authorId=req.params.authorId;
    const author=await findAuthorById(authorId, res);
    return new Response(author, "Author founded successfully").success(res);

};
exports.get_authors=async (req,res)=>{
    const authors=await Author.find();
    return new Response(authors, `Authors listed successfully`).success(res)
};