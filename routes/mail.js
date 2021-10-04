const router = require('express').Router();

const { sendOrder, sendCallback } = require('../controllers/mail');
const { sendOrderValidator, sendCallbackValidator } = require('../middlewares/validator');

router.post('/order', sendOrderValidator, sendOrder);
router.post('/callback', sendCallbackValidator, sendCallback);

module.exports.mailRouter = router;
