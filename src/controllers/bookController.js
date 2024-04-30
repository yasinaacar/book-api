const slugfield = require("../helpers/slugfield");
const Book = require("../models/book");
const Author = require("../models/author");
const Category = require("../models/category");
const Publisher = require("../models/publisher");
const {APIError, UniqueValueError} = require("../utils/errors");
const Response = require("../utils/resposne");
const fs=require("fs");
const path=require("path");

/**
 * This function was created to find for books by ID number.
 * @param {string} bookId - bookId from 'req.body' or 'req.params'. For get transaction use 'req.params'.
 * @param {object} res - response object.
 */
async function findBookById(bookId,res){
    const book=await Book.findById(bookId)
    .populate("authors", "fullname _id")
    .populate("publisher", "name _id")
    .populate("categories", "name _id")
    if(!book){
        return new Response(null,`No book found with book ID "${bookId}". Please chek ID number`).error404(res);
    };
    return book;
};
exports.post_book=async (req,res)=>{
    const {name, edition, editionYears, language, barcode, price, stock, page, categoryIds, publisherId, authorIds}=req.body;
    let bookImage=req.file ? req.file.filename : null;
    try {
        const book = await Book.create({
            name,
            edition,
            editionYears: {
                firstEdition: editionYears.firstEdition,
                lastEdition: editionYears.lastEdition
            },
            language,
            barcode,
            price,
            stock,
            page: page,
            image: bookImage
        });
        if(authorIds && authorIds.length!=0){
            for (const authorId of authorIds) {
                const author=await Author.findById(authorId).select("_id books");

                if(author){
                    book.authors.push(author);
                    await book.save();
                    author.books.push(book);
                    await author.save();
                }
            }
        };
        if(categoryIds && categoryIds.length!=0){
            for (const categoryId of categoryIds) {
                const category=await Category.findById(categoryId).select("_id books");
                
                if(category){
                    book.categories.push(category);
                    await book.save();
                    category.books.push(book);
                    await category.save();
                }else{
                    console.log(`${category} not found`);
                }
            }
        }
        if(publisherId){
            const publisher=await Publisher.findById(publisherId).select("_id books");

            if(publisher){
                book.publisher=publisher._id;
                await book.save();
                publisher.books.push(book);
                await publisher.save();
            }
        }

        return new Response(book, `Book named ${book.name} created successfully`).created(res);
    } catch (err) {
        if (err.code === 11000 && err.name === "MongoServerError") {
            const keyValue = err.keyValue;
            const key = Object.keys(keyValue)[0];
            const value = keyValue[key];
            throw new UniqueValueError(`Unique value error. ${key} must be unique`, `${key} : ${value}`);
        }
        throw new APIError(`An error occurred while creating book. Error: ${err}`, null, 500);
    }
    
};
exports.put_book=async (req,res)=>{
    const bookId=req.params.bookId;
    const book=await findBookById(bookId, res);
    const {name, edition, editionYears, language, isbn, barcode, price, stock, page, categoryIds, publisherId, authorIds}=req.body;
    let bookImage=book.image;
    if(req.file){
        bookImage=req.file.filename;
        const rootDir=path.dirname(require.main.filename);
        fs.unlink(path.join(rootDir, "/src/public/uploads/images/books/", book.image), (err) => {
            if (err) {
                console.log(`Book edited but old image couldn't delete. Image: ${book.image} ERROR: ${err}`);
            }
        });
    };
    const savedAuthors=book.authors;
    if(savedAuthors && savedAuthors.length!=0){
        delete book.authors;
        await book.save();
        for (const savedAuthor of savedAuthors) {
            const author=await Author.findById(savedAuthor).select("_id books");
            if(author){
                const bookIndex=author.books.indexOf(author);
                if(bookIndex !== -1){
                    author.books.splice(bookIndex,1);
                }
            }
        }
    };
    const editedBook=await Book.findByIdAndUpdate(book._id,{
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
        categories: categoryIds,
        publisher: publisherId,
        authors: authorIds,
        image: bookImage
    },{new: true});

 

    return new Response(editedBook, `Book named ${editedBook.name} edited successfully`).success(res);
};
exports.delete_book=async (req,res)=>{
    const bookId=req.body.bookId;
    const book=await findBookById(bookId, res);

    await Book.findByIdAndDelete(book._id)
    if(book.image){
        const rootDir=path.dirname(require.main.filename);
        const imagePath = path.join(rootDir, "/src/public/uploads/images/books/", book.image);
        fs.unlink(imagePath, (err)=>{
            if(err){
                console.log(`Book id ${book.id} deleted successfully but image couldn't delete. Image: ${book.image}`, err);
            };
        });
    }
    const authors=book.authors;
    if(authors && authors.length>0){
        for (const authorId of authors) {
            const author=await Author.findById(authorId).select("_id books");
            if(author){
                const bookIndex=author.books.indexOf(book._id);
                console.log("BookIndex-------->", bookIndex);
                if(bookIndex != -1){
                    author.books.splice(bookIndex, 1);
                    await author.save();
                };
            };
        };
    };
    const publisher=book.publisher;
    if(publisher){
        await Publisher.findByIdAndUpdate(publisher,{
            $pull:{
                books: book._id
            }
        });
        
    };
    const categories=book.categories;
    if(categories && categories.length>0){
        for (const categoryId of categories) {
            const category=await Category.findById(categoryId).select("_id books");
            if(category){
                const bookIndex=category.books.indexOf(book._id);
                if(bookIndex != -1){
                    category.books.splice(bookIndex,1);
                    await category.save();
                }
            }
        }
    };
    new Response(book, `Book named ${book.name} deleted successfully`).success(res);
};
exports.get_book=async (req,res)=>{
    const bookId=req.params.bookId;
    const book=await findBookById(bookId, res);
    return new Response(book, undefined).success(res);
}
exports.get_books=async (req,res)=>{
    const books=await Book.find()
    .populate("authors", "fullname")
    .populate("categories", "name")
    .populate("publisher", "name")

    return new Response(books, "All books listed successfully").success(res);
};
