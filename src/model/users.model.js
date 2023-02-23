const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const usersModel = {
  query: (search, firstname, sortBy, limit, offset) => {
    let orderQuery = `ORDER BY first_name ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    if (!search && !firstname) {
      return orderQuery;
    } else if (search && firstname) {
      return `WHERE first_name LIKE '%${search}%' AND first_name LIKE '${firstname}%' ${orderQuery}`;
    } else if (search || firstname) {
      return `WHERE first_name LIKE '%${search}%' OR first_name LIKE '${firstname}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },

  get: function (search, firstname, sortBy = "ASC", limit = 20, offset = 0) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from users ${this.query(
          search,
          firstname,
          sortBy,
          limit,
          offset
        )}`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },
  getDetail: (id) => {
    // const { id } = req.params;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT users.id,
        users.first_name,
        users.last_name,
        users.email,
        users.phone_number,
        users.password,
        users.pin,
        json_agg(row_to_json(users_images)) images
        FROM users INNER JOIN users_images ON users.id=users_images.id_users AND
        id='${id}'
        GROUP BY users.id `,

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
  // update: ({
  //   id,
  //   fullname,
  //   username,
  //   password,
  //   email,
  //   address,
  //   phone_number,
  //   image,
  // }) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
  //       if (err) {
  //         return reject(err.message);
  //       } else {
  //         // const dataUpdate = [result.rows[0].title, result.rows[0].img, result.rows[0].price, result.rows[0].category]
  //         db.query(
  //           `UPDATE users SET fullname='${
  //             fullname || result.rows[0].fullname
  //           }', username ='${username || result.rows[0].username}', password='${
  //             password || result.rows[0].password
  //           }',email ='${email || result.rows[0].email}',address='${
  //             address || result.rows[0].address
  //           }',phone_number='${
  //             phone_number || result.rows[0].phone_number
  //           },image='${image || result.rows[0].image}'WHERE id='${id}'`,
  //           (err, result) => {
  //             if (err) {
  //               return reject(err.message);
  //             } else {
  //               return resolve({ id, email, password, phone_number, name });
  //             }
  //           }
  //         );
  //       }
  //     });
  //   });
  // },
  update: ({
    id,
    firstname,
    lastname,
    email,
    phone_number,
    password,
    pin,
    images,
    file,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            `UPDATE users SET first_name='${
              firstname || result.rows[0].firstname
            }', last_name ='${
              lastname || result.rows[0].lastname
            }', password='${password || result.rows[0].password}',email ='${
              email || result.rows[0].email
            }',pin='${pin || result.rows[0].pin}',phone_number='${
              phone_number || result.rows[0].phone_number
            }', images='${images || result.rows[0].images}' WHERE id='${id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                if (file.length <= 0)
                  return resolve({
                    id,
                    firstname,
                    lastname,
                    email,
                    phone_number,
                    password,
                    pin,
                  });
                // else {
                //   // for (let index = 0; index < file.length; index++) {
                //   //   db.query(
                //   //     `INSERT INTO users_images (id_images, id_users, username, filename) VALUES($1, $2 ,$3 , $4)`,
                //   //     [uuidv4(), result.rows[0].id, username, file[index].filename]
                //   //   );
                // }
                db.query(
                  `SELECT id_images, filename FROM users_images WHERE id_users='${id}'`,
                  (errUsersImages, usersImages) => {
                    if (errUsersImages)
                      return reject({ message: errUsersImages.message });
                    for (let indexNew = 0; indexNew < file.length; indexNew++) {
                      db.query(
                        `UPDATE users_images SET filename=$1 WHERE id_images=$2`,
                        [
                          file[indexNew].filename,
                          usersImages.rows[indexNew].id_images,
                        ],
                        (err, result) => {
                          if (err) {
                            return reject({ message: "images is not deleted" });
                          } else {
                            return resolve({
                              id,
                              firstname,
                              lastname,
                              email,
                              phone_number,
                              password,
                              pin,
                              oldImages: usersImages.rows,
                              images: file,
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
      });
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from users WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete");
        }
      });
    });
  },
};

module.exports = usersModel;
