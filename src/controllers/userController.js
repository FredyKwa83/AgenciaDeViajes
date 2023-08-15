const { log } = require('console');
const fs = require('fs');
const path = require('path');

const { validationResult } = require ('express-validator');

const bcrypt = require ('bcryptjs');

const librosFilePath = path.join(__dirname, '../database/librosDataBase.json');
let libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));

const usuariosFilePath = path.join(__dirname, "../database/usuarios.json");
let usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));


const controller ={

    register: (req, res) => {
        //res.sendFile((__dirname + '/views/register.html'));
        res.render('register');
    },

	registerPOST: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty){
					
			let idNuevoUsuario = (usuarios[usuarios.length-1].id)+1; 

			let passwordEncriptada = bcrypt.hashSync (req.body.password, 10)
	
			let objNuevoUsuario = {
				id: idNuevoUsuario,
				nombre: req.body.nombre,
				Apellido: req.body.Apellido,
				username: req.body.username,
				email: req.body.email,
				fechaNacimiento: req.body.fechaNacimiento,
				pais: req.body.pais,
				genero: req.body.genero,
				password: passwordEncriptada
			}
	
			usuarios.push(objNuevoUsuario);
	
			fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios,null,' '));
	
			res.redirect('/'); 
		}
		else {
			res.render ('register', {errors: errors.array()}); //no aparecen lo errores
		}
	},

    login :(req, res) => {
        //res.sendFile((__dirname + '/views/login.html'));
        res.render('login');
    },

	loginPOST : (req, res) => {
		
		for (i=0; i<usuarios.length; i++){	

			if ((req.body.usernameLogin == usuarios[i].username) && (bcrypt.compareSync(req.body.passwordLogin, usuarios[i].password))){

				res.redirect('/');
			}
			else{

				res.render ('login');
			}
		}
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