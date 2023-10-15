const express = require('express');
const router = express.Router();
const apiController = require('../controllers/librosApiController');

router.get("/", apiController.list)
router.get("/search", apiController.buscar)
router.get("/:id", apiController.mostrar)
router.post("/", apiController.crear)
router.delete("/:id", apiController.eliminar)

module.exports = router;