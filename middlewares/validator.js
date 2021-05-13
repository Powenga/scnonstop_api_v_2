const { check, validationResult, oneOf, body } = require('express-validator');

module.exports.validateMessage =
  [
    body('appType').isLength({ max: 25 }).not().isEmpty().trim().escape(),
    body('appMark').isLength({ min: 2, max: 25 }).not().isEmpty().trim().escape(),
    body('problem').isLength({ min: 3, max: 250 }).not().isEmpty().trim().escape(),
    body('street').isLength({ min: 3, max: 50 }).not().isEmpty().trim().escape(),
    body('house').isLength({ min: 1, max: 5 }).not().isEmpty().trim().escape(),
    body('apartment').isLength({ min: 1, max: 5 }).not().isEmpty().trim().escape(),
    body('userName').isLength({ min: 2, max: 50 }).not().isEmpty().trim().escape(),
    body('phone').isLength({ min: 3, max: 20 }).not().isEmpty().trim().escape(),
    body('policy').toBoolean()
  ];

module.exports.checkValidation = (req, res, next) => {

  try {
    validationResult(req).throw();
    console.log(validationResult(req));
    // yay! we're good to start selling our skilled services :)))
    next();
  } catch (err) {
    // Oh noes. This user doesn't have enough skills for this...
    next(err);
  }
}