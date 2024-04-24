const express=require("express");

const bookController=require("../controllers/bookController");
const fileUpload=require("../helpers/fileUpload");

const router=express.Router();

router.post("/", fileUpload.upload.single("bookImages") ,bookController.post_book);
router.get("/",bookController.get_books);

module.exports=router;