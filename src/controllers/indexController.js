const fs = require('fs');
const path = require('path');

const db = require ('../database/models')

const librosFilePath = path.join(__dirname, '../database/librosDataBase.json');
let products = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));

const controller ={
    
    index : (req, res) => {
        //res.sendFile((__dirname + '/views/index.html'));
        //res.render('index');
        libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));
		res.render('index', {libros});

        db.libro.findAll().then(function(resultados){
            console.log(resultados);
        })
    },

    detalledeProducto : (req, res) => {
        let id = req.params.id;
        libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));
        libros = libros.find(libro => libro.id == id);
        if (libros){
        res.render('detalleProducto', {libros: libros});
        }
    },

    cart : (req, res) => {
        //res.sendFile((__dirname + '/views/cart.html'));
        let id = req.params.id;
        libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));
        libros = libros.find(libro => libro.id == id);
        if (libros){
        res.render('cart', {libros: libros});
        }
    },

    getEdit : (req, res) => {
        let id = req.params.id;
        libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));
        libros = libros.find(libro => libro.id == id);
        if (libros){
            res.render('libro-edit-form', {libros});
        }
        
    },

    putEdit : (req, res) => {
        let id = req.params.id;
        libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));

        l = libros.find(libro => libro.id == id);
        
        if (l){
            l.titulo = req.body.titulo;
            l.precio = req.body.precio;
            l.descuento = req.body.descuento;
            l.genero = req.body.genero;
            l.descripcion = req.body.descripcion;
        
           
        } 

        fs.writeFileSync(librosFilePath, JSON.stringify(libros, null, ' '));

        res.redirect ('/')
        
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