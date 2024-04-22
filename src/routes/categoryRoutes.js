const express=require("express");

const categoryController=require("../controllers/categoryController");
const ValidateCategory=require("../middlewares/validations/categoryValidations");
const router=express.Router();

router.put("/:categoryId", ValidateCategory.edit, categoryController.put_category);
router.post("/", ValidateCategory.create,categoryController.post_category);
router.delete("/:categoryId", categoryController.delete_category);
router.get("/:categoryId", categoryController.get_category); 
router.get("/",categoryController.get_categories);

module.exports=router;