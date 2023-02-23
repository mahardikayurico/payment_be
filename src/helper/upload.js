const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const formUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let formatType = path.extname(file.originalname);
    if (formatType == ".png" || formatType == ".jpg" || formatType == ".jpeg") {
      cb(null, true);
    } else {
      cb("Image not valid", false);
    }
  },
  limits: {
    fileSize: 1048576 * 5, // 5 mb
  },
});

module.exports = formUpload;
