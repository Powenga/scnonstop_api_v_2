const multer = require('multer');
const path = require('path');
const BadRequestError = require('../errors/bad-request-err');

const {
  UPLOAD_FILE_FOLDER,
  ACCEPTED_FILE_TYPES,
  MAX_FILE_FORM_FILES,
  MAX_MULTIPART_FORM_FIELDS,
  MAX_FILE_SIZE,
  NEWS_IMAGE_FIELDNAME,
  NEWS_IMAGE_FOLDER,
  SPECIALIST_IMAGE_FIELDNAME,
  SPECIALIST_IMAGE_FOLDER,
} = require('../config');

const uploadPath = UPLOAD_FILE_FOLDER;
const filetypeList = ACCEPTED_FILE_TYPES;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === NEWS_IMAGE_FIELDNAME) {
      cb(null, `${uploadPath}${NEWS_IMAGE_FOLDER}`);
    } else if (file.fieldname === SPECIALIST_IMAGE_FIELDNAME) {
      cb(null, `${uploadPath}${SPECIALIST_IMAGE_FOLDER}`);
    } else {
      cb(new BadRequestError('Ошибка передачи файлов'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname).toLowerCase());
  },
});

const limits = {
  files: MAX_FILE_FORM_FILES,
  fields: MAX_MULTIPART_FORM_FIELDS,
  fileSize: MAX_FILE_SIZE,
};

const fileFilter = (req, file, cb) => {
  const extname = filetypeList.test(path.extname(file.originalname).toLowerCase());
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
