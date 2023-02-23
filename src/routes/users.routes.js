const express = require("express");
const router = express();
const verifyToken = require("../helper/verifyToken");
//import controller=
const usersController = require("../controller/users.controller");
const formUpload = require("../helper/upload");

router.get("/", usersController.get); //see profile
router.get("/:id", usersController.getDetail); //see profile with id
router.patch("/:id", formUpload.array("images"), usersController.update); //change profile
router.delete("/:id", usersController.remove);

// route.put("/profile/pin", verifyToken, userController.changePin); //change pin
// route.put("/profile/phone", verifyToken, userController.changePhone); //change phone

module.exports = router;
