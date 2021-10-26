const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getUser, updateUserPassword } = require('../controllers/user');
const { validateUpdatePassword } = require('../middlewares/validator');

router.use(auth);

router.get('/me', getUser);
router.patch('/me/password', validateUpdatePassword, updateUserPassword);

module.exports.userRouter = router;
