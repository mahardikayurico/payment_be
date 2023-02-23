const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const authModel = {
  login: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email=$1`, [email], (err, result) => {
        if (err) return reject(err.message);
        if (result.rows.length == 0) return reject("email/password salah."); //ketika username salah
        bcrypt.compare(
          password,
          result.rows[0].password,
          (err, hashingResult) => {
            if (err) return reject(err.message); //kesalahan hashing(bycript)
            if (!hashingResult) return reject("email/password salah."); //ketika password salah
            return resolve(result.rows[0]);
          }
        );
      });
    });
  },
  register: ({ firstname, lastname, password, email }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id, first_name, last_name, password, email) VALUES ('${uuidv4()}','${firstname}','${lastname}','${password}','${email}') RETURNING id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            // for (let index = 0; index < file.length; index++) {
            db.query(
              `INSERT INTO users_images (id_images, id_users) VALUES($1, $2)`,
              [uuidv4(), result.rows[0].id]
            );
            db.query(
              `INSERT INTO wallet (id_wallet, id_users) VALUES($1, $2)`,
              [uuidv4(), result.rows[0].id]
            );
            // }
            return resolve({
              firstname,
              lastname,
              password,
              email,
            });
          }
          // return resolve({
          //   firstname,
          //   lastname,
          //   password,
          //   email,
          // });
        }
      );
    });
  },

  // pinconfirmation: ({ pin }) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM users WHERE pin=$1`, [pin], (err, result) => {
  //       if (err) return reject(err.message);
  //       if (result.rows.length == 0) return reject("pin salah"); //ketika pin salah
  //       bcrypt.compare(pin, result.rows[0].pin, (err, hashingResult) => {
  //         if (err) return reject(err.message); //kesalahan hashing(bycript)
  //         if (!hashingResult) return reject("pin salah"); //ketika pin salah
  //         return resolve(result.rows[0]);
  //       });
  //     });
  //   });
  // },

  // createpin: ({ pin }) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(
  //       `INSERT INTO users (id, pin) VALUES ('${uuidv4()}','${pin}') RETURNING id`,
  //       (err, result) => {
  //         if (err) {
  //           return reject(err.message);
  //         }
  //         return resolve({
  //           pin,
  //         });
  //       }
  //     );
  //   });
  // },
};
module.exports = authModel;
