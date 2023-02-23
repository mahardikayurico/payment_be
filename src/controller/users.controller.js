const usersModel = require("../model/users.model");
const Pagination = {
  page: (page, limit) => {
    let result = (page - 1) * limit + 1;
    return result ? result : 0;
  },
};

const usersController = {
  get: (req, res) => {
    let { search, firstname, sortBy, page, limit } = req.query;
    let offset = Pagination.page(page, limit);
    return usersModel
      .get(search, firstname, sortBy, limit, offset)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  getDetail: (req, res) => {
    // const id = req.params.id;
    return usersModel
      .getDetail(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  update: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
      file: req.files,
    };
    return usersModel
      .update(request)
      .then((result) => {
        if (typeof result.oldImages != "undefined") {
          for (let index = 0; index < result.oldImages.length; index++) {
            unlink(
              `src/public/uploads/images/${result.oldImages[index].filename}`
            );
          }
        }
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  remove: (req, res) => {
    return usersModel
      .remove(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = usersController;
