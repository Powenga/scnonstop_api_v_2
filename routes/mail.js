const router = require('express').Router();

const { sendMail } = require('../controllers/mail');
const { validateMessage, checkValidation } = require('../middlewares/validator');

router.post('/order', sendMail);
router.post('/callback', () => {});

module.exports.mailRouter = router;
