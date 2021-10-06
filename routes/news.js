const router = require('express').Router();
const { createNews, updateNewsImage } = require('../controllers/news');
const { validateNews } = require('../middlewares/validator');

router.post('/', validateNews, createNews); // new
router.patch('/', updateNewsImage);
router.patch('/:id', () => {}); // update
router.delete('/:id', () => {});

module.exports.newsRouter = router;
