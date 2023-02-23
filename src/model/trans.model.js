const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");

const transModel = {
  transfer: ({ id_sender, receiver, amount }) => {
    return new Promise((resolve, reject) => {
      // Check if sender has sufficient balance
      db.query(
        `SELECT balance FROM wallet WHERE id_users='${id_sender}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else if (result.rows[0].balance < amount) {
            return reject("Insufficient balance");
          } else {
            // Check if receiver exists in database
            db.query(
              `SELECT * FROM users WHERE id ='${receiver}'`,
              (err, result) => {
                if (err) {
                  return reject(err.message);
                } else if (result.rows.length === 0) {
                  return reject("Receiver not found");
                } else {
                  // Transfer balance
                  db.query(
                    `UPDATE wallet SET balance=balance-'${amount}' WHERE id_users='${id_sender}'`,
                    (err, result) => {
                      if (err) {
                        return reject(err.message);
                      } else {
                        db.query(
                          `UPDATE wallet SET balance=balance+'${amount}' WHERE id_users='${receiver}'`,
                          (err, result) => {
                            if (err) {
                              return reject(err.message);
                            } else {
                              db.query(
                                `INSERT INTO transaction (id_transaction, id_sender, receiver, amount) VALUES ('${uuidv4()}','${id_sender}','${receiver}','${amount}') RETURNING id_transaction`,
                                (err, result) => {
                                  if (err) {
                                    return reject(err.message);
                                  } else {
                                    return resolve({
                                      id_sender: id_sender,
                                      receiver: receiver,
                                      amount: amount,
                                    });
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
  },
};

module.exports = transModel;
