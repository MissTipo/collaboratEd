// Multer configuration

// require multer and path
const multer = require('multer');
const path = require('path');

// configure the storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the middleware
module.exports = function (req, res, next) {
  multer({
    storage,
    fileFilter(req, file, callback) {
      // console.log("In filter");
      const ext = path.extname(file.originalname);
      if (
        ext !== '.png'
        && ext !== '.jpg'
        && ext !== '.gif'
        && ext !== '.jpeg'
      ) {
        // console.log("Clouderrr");
        return callback(new Error('Only images are allowed'));
      }
      callback(null, true);
    },
  }).single('image')(req, res, (err) => {
    if (err) {
      // console.error("Upload Error:", err.message);
      return res.status(400).json('Only images are allowed');
    }
    next();
  });
};
