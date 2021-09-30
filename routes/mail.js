const router = require('express').Router();

const { sendOrder, sendCallback } = require('../controllers/mail');
const { validateMessage, checkValidation } = require('../middlewares/validator');

router.post('/order', sendOrder);
router.post('/callback', sendCallback);

module.exports.mailRouter = router;
