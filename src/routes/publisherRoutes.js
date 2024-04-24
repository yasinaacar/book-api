const express=require("express");
const publisherController=require("../controllers/publisherController");
const ValidatePublisher=require("../middlewares/validations/publisherValidations");
const router=express.Router();

router.post("/", ValidatePublisher.create, publisherController.post_publisher);
router.put("/:publisherId", ValidatePublisher.edit, publisherController.put_publisher);
router.delete("/:publisherId", ValidatePublisher.delete,publisherController.delete_publisher);
router.get("/:publisherId", publisherController.get_publisher);
router.get("/", publisherController.get_publishers);


module.exports=router;