const express = require('express');

const router = express.Router();

const controller = require('../controllers/indexController');

router.get('/', controller.index );

router.get('/producto/:id', controller.detalledeProducto );

router.get('/cart', controller.cart);

router.get ('/edit/:id', controller.getEdit);
router.put ('/edit/:id', controller.putEdit);



module.exports = router;