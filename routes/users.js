const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getUser, updateUserPassword } = require('../controllers/user');

router.use(auth);

router.get('/me', getUser);
router.patch('/me/password', updateUserPassword);

module.exports.userRouter = router;
