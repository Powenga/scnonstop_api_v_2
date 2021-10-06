const multer = require('multer');
const path = require('path');
const BadRequestError = require('../errors/bad-request-err');

const uploadPath = '../scnonstop_test_public_html/uploads';
const filetypeList = /jpeg|jpg|png|gif/;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'news-image') {
      cb(null, `${uploadPath}/news-image`);
    } else if (file.fieldname === 'specialist-avatar') {
      cb(null, `${uploadPath}/specialists`);
    } else {
      cb(new BadRequestError('Ошибка передачи файлов'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname).toLowerCase());
  },
});

const limits = {
  files: 1,
  fields: 0,
  fileSize: 50000000,
};

const fileFilter = (req, file, cb) => {
  const extname = filetypeList.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypeList.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  return cb(new BadRequestError('Переданы неподдерживаемые файлы'));
};

module.exports.upload = multer({
  storage,
  limits,
  fileFilter,
});
