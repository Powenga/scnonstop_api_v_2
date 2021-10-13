const router = require('express').Router();
const {
  createNews, updateNewsImage, updateNews, deleteNews, getAllNews,
} = require('../controllers/news');
const { validateNews, validateID } = require('../middlewares/validator');

router.get('/', getAllNews);
router.post('/', validateNews, createNews);
router.patch('/:id/image', validateID, updateNewsImage);
router.patch('/:id', validateID, validateNews, updateNews);
router.delete('/:id', validateID, deleteNews);

module.exports.newsRouter = router;
