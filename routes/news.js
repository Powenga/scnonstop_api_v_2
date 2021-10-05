const router = require('express').Router();
const { createNews } = require('../controllers/news');
const { createNewsValidator } = require('../middlewares/validator');

router.post('/', createNewsValidator, createNews); // new
router.patch('/:id', () => {}); // update
router.delete('/:id', () => {});

module.exports.newsRouter = router;
