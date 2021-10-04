const router = require('express').Router();

const { sendOrder, sendCallback } = require('../controllers/mail');
const { sendOrderValidator } = require('../middlewares/validator');

router.post('/order', sendOrderValidator, sendOrder);
router.post('/callback', sendCallback);

module.exports.mailRouter = router;
