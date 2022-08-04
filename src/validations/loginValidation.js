const {check} = require('express-validator');

const email = check('email').notEmpty()
    .withMessage('The field email is required.')
    .isString()
    .withMessage('The field email must be a string.')
    .isLength({
      min: 6,
      max: 255,
    })
    .withMessage('The field email must have between 6 and 255 characters.')
    .trim();

const password = check('password').notEmpty()
    .withMessage('The field password is required.')
    .isString()
    .withMessage('The field password must be a string.')
    .isLength({
      min: 8,
      max: 255,
    })
    .withMessage('The field password must have between 8 and 255 characters.')
    .trim();

module.exports = [email, password];
