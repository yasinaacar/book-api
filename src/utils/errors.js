class APIError extends Error{
    constructor(message, name="API Error", statusCode){
        super(message),
        this.name=name;
        this.statusCode=statusCode;
    }
};

class UniqueValueError extends Error{
    constructor(message=`Unique value error. The value of "${err.uniqueValue}" already saved.`, uniqueValue){
        super(message)
        this.uniqueValue=uniqueValue
    }
};

module.exports={APIError, UniqueValueError};