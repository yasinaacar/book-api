const express=require("express");

const authorController=require("../controllers/authorController");
const ValidateAuthor=require("../middlewares/validations/authorValidations");
const fileUpload=require("../helpers/fileUpload");
const router=express.Router();

router.post("/", fileUpload.upload.single("authorImg"), ValidateAuthor.create, authorController.post_author);
router.put("/:authorId", fileUpload.upload.single("authorImg"), ValidateAuthor.edit,authorController.put_author);
router.delete("/:authorId", ValidateAuthor.delete, authorController.delete_author);
router.get("/:authorId", authorController.get_author);
router.get("/", authorController.get_authors);

module.exports=router;