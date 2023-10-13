const fs = require('fs');
const path = require('path');

const db = require ('../database/models')

const librosFilePath = path.join(__dirname, '../database/librosDataBase.json');
let products = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));

const controller ={
    
    index : (req, res) => {
        //res.sendFile((__dirname + '/views/index.html'));
        //res.render('index');
        /*libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));
		res.render('index', {libros});*/
        db.libro.findAll()
            .then(function(libros){
                return res.render('index', {libros: libros});
            })
    },

    detalledeProducto : (req, res) => {
        /* let id = req.params.id;
        libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));
        libros = libros.find(libro => libro.id == id);
        if (libros){
        res.render('detalleProducto', {libros: libros});
        }*/
        db.libro.findByPk(req.params.id)
            .then(function(libros){
                return res.render('detalleProducto', {libros: libros});
            })
    },

    cart : (req, res) => {
        //res.sendFile((__dirname + '/views/index.html'));
        //res.render('index');
        /*libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));
        res.render('index', {libros});*/
        db.libro.findByPk(req.params.id)
            .then(function(libros){
                return res.render('cart', {libros: libros});
            })

    },

    getEdit : (req, res) => {
        /*let id = req.params.id;
        libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));
        libros = libros.find(libro => libro.id == id);
        if (libros){
            res.render('libro-edit-form', {libros});
        }*/

        let findLibro = db.libro.findByPk(req.params.id);
        let findCategoria = db.categoria.findAll();

        Promise.all([findLibro, findCategoria])
            .then(function ([libros, generos]){
                res.render ('libro-edit-form', {libros: libros, generos: generos});
            })
        
    },

    putEdit : (req, res) => {
        /*let id = req.params.id;
        libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));

        l = libros.find(libro => libro.id == id);
        
        if (l){
            l.titulo = req.body.titulo;
            l.precio = req.body.precio;
            l.descuento = req.body.descuento;
            l.genero = req.body.genero;
            l.descripcion = req.body.descripcion;
        
           
        } 

        fs.writeFileSync(librosFilePath, JSON.stringify(libros, null, ' '));*/

        db.libro.update({
            nombre: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            descuento: req.body.descuento
        },
        
        {where: {
            id: req.params.id
        }})

            res.redirect('/' ); // Redirige a la página de detalles del libro actualizado

        
    },

    delete : (req, res) => {
        let id = req.params.id;
        libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));

        let arregloProductos = libros.filter(function(e){
            return e.id!=id
        });

        fs.writeFileSync(librosFilePath, JSON.stringify(arregloProductos, null, ' '));
        res.redirect("/");
    }
}
module.exports = controller;