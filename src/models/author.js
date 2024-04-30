const mongoose=require("mongoose");

const authorSchema=new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        trim: true
    },
    biography:{
        type: String,
        trim: true
    },
    image:{
        type: String,
    },
    books:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
});

const Author=mongoose.model("Author", authorSchema);

module.exports=Author;