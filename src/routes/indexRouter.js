const express = require('express');

const router = express.Router();

const controller = require('../controllers/indexController');

router.get('/', controller.index );

router.get('/producto', controller.detalledeProducto );

router.get('/cart', controller.cart);


module.exports = router;