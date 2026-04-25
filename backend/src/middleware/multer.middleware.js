const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, image, cb) {
    cb(null, './temp/files')
  },
  filename: function (req, profileImage, cb) {
    cb(null, profileImage.originalname)
  }
})

const upload = multer({ storage: storage });

module.exports = upload;