const { log } = require('console');
const fs = require('fs');
const path = require('path');

const { validationResult } = require ('express-validator');

const librosFilePath = path.join(__dirname, '../database/librosDataBase.json');
let libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));


const controller ={

    register: (req, res) => {
        //res.sendFile((__dirname + '/views/register.html'));
        res.render('register');
    },

	registerPOST: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty){
			//logica
		}
		else {
			res.render ('/register', {errors: errors.array()});
		}
	},

    login :(req, res) => {
        //res.sendFile((__dirname + '/views/login.html'));
        res.render('login');
    },
    create: (req, res) => {
		res.render('libro-create-form');
	},
    store: (req, res) =>{
        let datosFormulario = req.body;
		let idNuevoLibro = (libros[libros.length-1].id)+1; // obtener un id (acordate por que +1)
		// console.log(idNuevoLibro); // verificar antes de continuar

		let objNuevoLibro = {
			id: idNuevoLibro,
			titulo: datosFormulario.titulo,
			precio: parseInt(datosFormulario.precio),
			descuento: parseInt(datosFormulario.descuento),
			genero: datosFormulario.genero,
			descripcion: datosFormulario.descripcion,
			imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/a3/5d/a35d90ab325ce95ac1eb3ab1775c04f6.jpg"
		}

		libros.push(objNuevoLibro);

		fs.writeFileSync(librosFilePath, JSON.stringify(libros,null,' '));

		res.redirect('/'); // manda el producto al index
    }

}

module.exports = controller;