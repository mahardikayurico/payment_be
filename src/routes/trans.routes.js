const express = require("express");
const router = express();
const verifyToken = require("../helper/verifyToken");
//import controller=
const transController = require("../controller/trans.controller");
const formUpload = require("../helper/upload");

router.post("/transfer/:receiver", transController.transfer); //topup

module.exports = router;
