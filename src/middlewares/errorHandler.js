const {UniqueValueError, APIError}=require("../utils/errors");

const errorHandler=(err, req, res, next)=>{
    console.log(err)
    if(err instanceof APIError){
        return res.status(err.statusCode || 400).json({
            success: false,
            errorName: err.name ?? "API Error",
            message: `${err.message}`
        });
    }else if(err instanceof UniqueValueError){
        return res.status(400).json({
            success: false,
            message: `Unique value error. The value of "${err.uniqueValue}" already saved.`
        })
    }else{
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please check your API"
        });
    }

};

module.exports=errorHandler;