const router = require('express').Router();
const { createNews, updateNewsImage, updateNews } = require('../controllers/news');
const { validateNews } = require('../middlewares/validator');

router.post('/', validateNews, createNews);
router.patch('/:id/image', updateNewsImage);
router.patch('/:id', validateNews, updateNews);
router.delete('/:id', () => {});

module.exports.newsRouter = router;
