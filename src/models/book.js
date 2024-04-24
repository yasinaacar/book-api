const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    edition:{
        type: Number,
        default: 1,
        min: 1,
        required: true
    },
    editionYears:{
        firstEdition:{
            type: Number,
        },
        lastEdition:{
            type: Number,
        }
    },
    language:{
        type: String,
        trim: true,
        default: "Türkçe-TR",
        minlength: 2
    },
    page:{
        type: Number,
        min: 1,
        required: true,
    },
    isbn:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    barcode:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        min: 0,
        required: true
    },
    stock:{
        type: Number,
        min: 0,
        default: 0
    },
    images:{
        type: String
    },
    url:{
        type: String,
        required: true,
        unique: true
    },
    authors:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author"
        }
    ],
    categories:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Category"
        }
    ],
    publisher: {type: mongoose.Schema.Types.ObjectId, ref: "Publisher"}

});

const Book=mongoose.model("Book", bookSchema);

module.exports=Book;