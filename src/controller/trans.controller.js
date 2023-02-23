const transModel = require("../model/trans.model");

const transController = {
  transfer: (req, res) => {
    const request = {
      //   ...req.body,
      id_sender: req.body.id_sender,
      receiver: req.params.receiver,
      amount: req.body.amount,
    };
    // const reques = {
    //   ...req.body,
    //   id: req.params.id,
    //   balance: req.body.balance,
    // };
    console.log(request);

    return transModel
      .transfer(request)
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
};

module.exports = transController;
