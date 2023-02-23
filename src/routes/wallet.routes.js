const express = require("express");
const router = express();
const verifyToken = require("../helper/verifyToken");
//import controller=
const walletController = require("../controller/wallet.controller");
const formUpload = require("../helper/upload");

router.patch("/topup/:id", walletController.topup);
router.get("/:id", walletController.getDetail); //topup

module.exports = router;
