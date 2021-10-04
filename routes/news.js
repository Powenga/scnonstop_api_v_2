const router = require('express').Router();
const { createNews } = require('../controllers/news');

router.post('/', createNews); // new
router.patch('/:id', () => {}); // update
router.delete('/:id', () => {});

module.exports.newsRouter = router;
