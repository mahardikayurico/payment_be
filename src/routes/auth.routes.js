const express = require("express");
const router = express();
const formUpload = require("../helper/upload");

//import controller=
const authController = require("../controller/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);
// router.post("/createpin", authController.createpin);
// router.post("/pinconfirmation", authController.pinconfirmation);
module.exports = router;
