const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const walletModel = {
  topup: ({ id, balance }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM wallet WHERE id_users='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          const currentBalance = result.rows[0].balance;
          console.log(currentBalance, "balance now");
          const newBalance = currentBalance + parseInt(balance);
          console.log(newBalance);
          db.query(
            `UPDATE wallet SET balance='${newBalance}' WHERE id_users='${id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                return resolve({
                  id,
                  balance: newBalance,
                });
              }
            }
          );
        }
      });
    });
  },
  getDetail: (id) => {
    // const { id } = req.params;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM wallet WHERE id_users='${id}'`,

        // `SELECT * from users WHERE id='${id}'`,

        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },
};

module.exports = walletModel;
