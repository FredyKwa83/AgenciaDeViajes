const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const registerValidations = require('../validations/registerValidations');


router.get('/perfil', userController.perfil);

router.get('/register', userController.register );
router.post('/register', registerValidations, userController.registerPOST);

router.get('/login', userController.login);
router.post('/login', userController.loginPOST)


/**CREAR UN PRODUCTO */
router.get('/create', userController.create);
router.post('/create', userController.store);


module.exports = router;





