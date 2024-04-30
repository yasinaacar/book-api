const mongoose=require("mongoose");

const categorySchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    books:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
});

const Category=mongoose.model("Category", categorySchema);

module.exports=Category;