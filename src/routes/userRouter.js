const express = require('express');

const router = express.Router();

const controller = require('../controllers/userController');

const { check } = require ('express-validator');

/*---------VALIDACIONES---------*/

let validaciones = [
    check('nombre').notEmpty().withMessage('campo vacio').bail(),
    check('Apellido').notEmpty().withMessage('campo vacio'),
    check('username').isLength({min: 5}).withMessage('se requieren al menos 5 caracteres'),
    check('email').isEmail()
];

router.get('/register', controller.register );
router.post('/register', validaciones, controller.registerPOST);

router.get('/login', controller.login);
router.post('/login', controller.loginPOST)

/**CREAR UN PRODUCTO */
router.get('/create', controller.create);
router.post('/create', controller.store);


module.exports = router;





