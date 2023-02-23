const express = require("express");
const router = express();
const authRoute = require("./auth.routes");
const usersRoute = require("./users.routes");
const walletRoute = require("./wallet.routes");
const transRoute = require("./trans.routes");

router.get("/", (req, res) => {
  return res.send("backend for payur ");
});

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/wallet", walletRoute);
router.use("/transaction", transRoute);

module.exports = router; //export, biar bisa diakses oleh file lain melalui require
