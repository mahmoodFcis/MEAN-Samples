const express = require("express");
const router = express.Router();
const userController=require("../controllers/userController");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");

const errorHandler=require("../middleware/errorHandler");
router.get("/", userController.list)
router.get("/:userName", userController.findByName);
router.post("/",errorHandler( userController.save));
router.put("/:userName",authentication,authorization(["admin"]), userController.update)
router.delete("/:userName", userController.delete)
module.exports = router;
