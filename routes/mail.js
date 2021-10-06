const router = require('express').Router();

const { sendOrder, sendCallback } = require('../controllers/mail');
const { validateSendCallback, validateSendOrder } = require('../middlewares/validator');

router.post('/order', validateSendOrder, sendOrder);
router.post('/callback', validateSendCallback, sendCallback);

module.exports.mailRouter = router;
