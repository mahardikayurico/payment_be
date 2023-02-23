const walletModel = require("../model/wallet.model");

const walletController = {
  topup: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
      balance: req.body.balance,
    };
    console.log(request);
    // const { id } = req.params;
    // const { balance } = req.body;
    return walletModel
      .topup(request)
      .then((result) => {
        if (result) {
          return res.status(201).send({ message: "Success", data: result });
        } else {
          return res.status(404).send({ message: "User not found" });
        }
      })
      .catch((error) => {
        return res.status(500).send({ message: error.message });
      });
  },
  getDetail: (req, res) => {
    // const id = req.params.id;
    return walletModel
      .getDetail(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = walletController;
