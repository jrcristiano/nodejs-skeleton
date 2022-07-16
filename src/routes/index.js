const {Router} = require('express');

const router = new Router();

/* Controllers */
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

/* Middlewares */
const checkJwt = require('../middlewares/checkJwtMiddleware');

/* Validations */
const userValidation = require('../validations/userValidation');

/* Login */
router.post('/login', authController.login);
router.post('/register', userValidation.store, userController.store);

/* Users */
router.get('/users', checkJwt, userController.index);
router.get('/users/:id', checkJwt, userController.show);
router.post('/users', checkJwt, userValidation.store, userController.store);
router.put('/users/:id',
    checkJwt,
    userValidation.update,
    userController.update,
);
router.delete('/users/:id', checkJwt, userController.destroy);

module.exports = router;
