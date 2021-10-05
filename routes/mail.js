const router = require('express').Router();

const { sendOrder, sendCallback } = require('../controllers/mail');
const { sendOrderValidator, sendCallbackValidator, validateSendCallback, checkValidation } = require('../middlewares/validator');

router.post('/order', sendOrderValidator, sendOrder);
router.post('/callback', validateSendCallback, sendCallback);

module.exports.mailRouter = router;
