const fs = require('fs');
const path = require('path');

const librosFilePath = path.join(__dirname, '../database/librosDataBase.json');
let products = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));

const controller ={
    
    index : (req, res) => {
        //res.sendFile((__dirname + '/views/index.html'));
        //res.render('index');
        libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8')); // lee devuelta el JSON por eso es let
		res.render('index', {libros});
    },
    
    detalledeProducto : (req, res) => {
        //res.sendFile((__dirname + '/views/detalleProducto.html'));
        res.render('detalleProducto');
    },

    cart : (req, res) => {
        //res.sendFile((__dirname + '/views/cart.html'));
        res.render('cart');
    }
}
module.exports = controller;