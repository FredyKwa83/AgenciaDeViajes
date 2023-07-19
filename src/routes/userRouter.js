const express = require('express');

const router = express.Router();

const controller = require('../controllers/userController');

router.get('/register', controller.register );

router.get('/login', controller.login);

/**CREAR UN PRODUCTO */
router.get('/create', controller.create);
router.post('/create', controller.store);


module.exports = router;





