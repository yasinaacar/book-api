const mongoose=require("mongoose");
const {Schema}=require("mongoose");

const publisherSchema=new Schema({
    name:{
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
    },
    phone:{
        type: Number,
    },
    address:{
        type: String,
        trim: true
    },
    url:{
        type: String,
        unique: true,
        required: true
    }
});

const Publisher=mongoose.model("Publisher", publisherSchema);

module.exports=Publisher;