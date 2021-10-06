const router = require('express').Router();
const { createNews } = require('../controllers/news');
const { validateNews } = require('../middlewares/validator');

router.post('/', validateNews, createNews); // new
router.patch('/:id', () => {}); // update
router.delete('/:id', () => {});

module.exports.newsRouter = router;
