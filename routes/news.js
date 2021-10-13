const router = require('express').Router();
const {
  createNews, updateNewsImage, updateNews, deleteNews,
} = require('../controllers/news');
const { validateNews, validateID } = require('../middlewares/validator');

router.post('/', validateNews, createNews);
router.patch('/:id/image', validateID, updateNewsImage);
router.patch('/:id', validateID, validateNews, updateNews);
router.delete('/:id', validateID, deleteNews);

module.exports.newsRouter = router;
