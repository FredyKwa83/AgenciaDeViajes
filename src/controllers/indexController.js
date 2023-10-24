const fs = require('fs');
const path = require('path');

const db = require ('../database/models')

const librosFilePath = path.join(__dirname, '../database/librosDataBase.json');
let products = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));

const controller ={
    
    index : (req, res) => {
        db.libro.findAll()
            .then(function(libros){
                return res.render('index', {libros: libros});
            })
    },

    detalledeProducto : (req, res) => {

        db.libro.findByPk(req.params.id)
            .then(function(libros){
                return res.render('detalleProducto', {libros: libros});
            })
    },

    cart : (req, res) => {
        db.libro.findByPk(req.params.id)
            .then(function(libros){
            res.render('cart', {libros: libros});
        })
    },

    getEdit : (req, res) => {
        let findLibro = db.libro.findByPk(req.params.id);
        let findCategoria = db.categoria.findAll();

        Promise.all([findLibro, findCategoria])
            .then(function ([libros, generos]){
                res.render ('libro-edit-form', {libros: libros, generos: generos});
            })
        
    },

    putEdit : (req, res) => {
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
        db.libro.destroy({
            where: {id: req.params.id}
        });
        res.redirect('/')
    }
}
module.exports = controller;