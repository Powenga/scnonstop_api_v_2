const router = require('express').Router();

const { sendMail, sendCallback } = require('../controllers/mail');
const { validateMessage, checkValidation } = require('../middlewares/validator');

router.post('/order', sendMail);
router.post('/callback', sendCallback);

module.exports.mailRouter = router;
