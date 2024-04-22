const Publisher = require("../models/publisher");
const Response=require("../utils/resposne");
const {UniqueValueError, APIError}=require("../utils/errors");
const slugfield=require("../helpers/slugfield");

async function findPublisherById(publisherId, res){
    const publisher=await Publisher.findById(publisherId);
    if(!publisher){
        return new Response(null, `Publisher not found with id number ${publisherId}`).error404(res);
    }
    return publisher
}

exports.post_publisher=async (req,res)=>{
    const {name, email, phone, address} = req.body;

    await Publisher.create({
        name: name.toLowerCase(),
        email: email,
        phone: phone,
        address: address,
        url: slugfield(name)
    })
    .then((data)=>{
        return new Response(data, `Publisher named ${data.name} created successfully`).success(res);
    })
    .catch(err=>{
        console.log(err)
        if(err.name=="MongoServerError" && err.code==11000){
            throw new UniqueValueError(null,name);
        }
        throw new APIError(`An occurred error while creating publishers. Error: ${err}`);
    });

};
exports.put_publisher=async (req,res)=>{
    const publisherId=req.params.publisherId;
    const publisher=await findPublisherById(publisherId, res);

    const {name, email, phone, address}=req.body;
    await Publisher.findByIdAndUpdate(publisher._id,{
        name: name.toLowerCase(),
        email,
        phone,
        address,
        url: slugfield(name)
    },{new: true})
    .then((data)=>{
        return new Response(data, `Publisher updated successfully`).success(res);
    })
    .catch(err=>{
        throw new APIError(`An error occurred while editing publisher. Error: ${err}`, null, 500);
    });
}
exports.delete_publisher=async (req,res)=>{
    const publisherId=req.params.publisherId;

    const publisher=await findPublisherById(publisherId, res);
    await Publisher.findByIdAndDelete(publisher._id)
    .then(()=>{
        return new Response(null, `Publisher named "${publisher.name}" deleted successfully`).success(res);
    })
    .catch(err=>{
        throw new APIError(`An error occurred while deleting publisher. Error: ${err}`,null,500);
    });
};
exports.get_publisher=async (req,res)=>{
    const publisherId=req.params.publisherId;

    const publisher=await findPublisherById(publisherId, res);

    return new Response(publisher, null).success(res);
}
exports.get_publishers=async (req,res)=>{
    const publishers=await Publisher.find();
    let responseMessage="All publishers listed successfully";
    if(publishers.length==0){
        responseMessage="We tried to list publishers but there are no publishers in the database";
    };
    return new Response(publishers, responseMessage).success(res);
};