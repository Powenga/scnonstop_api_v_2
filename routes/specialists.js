const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getAllSpecialists,
  createSpecialist,
  updateSpecialistImage,
  updateSpecialist,
  deleteSpecialist,
} = require('../controllers/specialists');
const { validateID, validateSpecialist } = require('../middlewares/validator');

router.get('/', getAllSpecialists);

router.use(auth);
router.post('/', validateSpecialist, createSpecialist);
router.patch('/:id/image', validateID, updateSpecialistImage);
router.patch('/:id', validateID, validateSpecialist, updateSpecialist);
router.delete('/:id', validateID, deleteSpecialist);

module.exports.specialistsRouter = router;
