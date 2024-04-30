const express=require("express");

const bookController=require("../controllers/bookController");
const fileUpload=require("../helpers/fileUpload");
const ValidateBook=require("../middlewares/validations/bookValidations");

const router=express.Router();

router.post("/", fileUpload.upload.single("bookImage"), ValidateBook.create ,bookController.post_book);
router.put("/:bookId", fileUpload.upload.single("bookImage") ,ValidateBook.edit, bookController.put_book);
router.delete("/:bookId", ValidateBook.delete, bookController.delete_book);
router.get("/:bookId", bookController.get_book);
router.get("/",bookController.get_books);

module.exports=router;