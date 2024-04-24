const slugfield = require("../helpers/slugfield");
const Book = require("../models/book");
const {APIError, UniqueValueError} = require("../utils/errors");
const Response = require("../utils/resposne");

async function findBookById(bookId,res){
    const book=await Book.findById(bookId);
    if(!book){
        return new Response(null,`No book found with book ID "${bookId}". Please chek ID number`).error404(res);
    };
    return book;
};
exports.post_book=async (req,res)=>{
    const {name, edition, editionYears, language, isbn, barcode, price, stock, page, categoryIds, publisherId, authorIds}=req.body;
    let bookImages=req.file ? req.file.filename : null;
    const url=slugfield(name)
    await Book.create({
        name,
        edition,
        editionYears:{
            firstEdition: editionYears.firstEdition,
            lastEdition: editionYears.lastEdition
        },
        language,
        isbn,
        barcode,
        price,
        stock,
        page: page,
        url: url,
        categories: categoryIds,
        publisher: publisherId,
        authors: authorIds,
        images: bookImages
    })
    .then((book)=>{
        return new Response(book, `Book named ${book.name} created successfully`).created(res);
    })
    .catch(err=>{
        throw new APIError(`An error occurred while creating book. Error: ${err}`, null, 500);
    })
}
exports.get_books=async (req,res)=>{
    const books=await Book.find()
    .populate("authors", "fullname")
    .populate("categories", "name")
    .populate("publisher", "name")

    return new Response(books, "All books listed successfully").success(res);
};
