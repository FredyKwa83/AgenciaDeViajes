const express = require('express');

const path =  require('path');

const router = express.Router();

const userController = require('../controllers/userController');

const registerValidations = require('../validations/registerValidations');

const multer = require('multer');

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/img'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });

router.get('/perfil', userController.perfil);

router.get('/register', userController.register );
router.post('/register',uploadFile.single('imagenPerfil'), registerValidations, userController.registerPOST);

router.get('/login', userController.login);
router.post('/login', userController.loginPOST)


/**CREAR UN PRODUCTO */
router.get('/create', userController.create);
router.post('/create',uploadFile.single('imagenLibro'), userController.store);


module.exports = router;




