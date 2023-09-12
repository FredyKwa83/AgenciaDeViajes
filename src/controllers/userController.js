const fs = require('fs');
const path = require('path');
const {all,findByField,generate,write} = require('../models/usersModel');

const {validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');

const librosFilePath = path.join(__dirname, '../database/librosDataBase.json');
let libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'))


const userController ={

    register: (req, res) => {
        //res.sendFile((__dirname + '/views/register.html'));
        res.render('register');
    },

	registerPOST: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) { 
            return res.render('register' , {errors: resultValidation.mapped() , old : req.body})
        } else {
			let user = generate(req.body);
			let allUsers = all();
			allUsers.push(user);
			write(allUsers);

			return res.render('login');
		}
	},

    login :(req, res) => {
        //res.sendFile((__dirname + '/views/login.html'));
        res.render('login');
    },

	loginPOST : (req, res) => {
		
		let userToLogin = findByField('username', req.body.usernameLogin)

        if (userToLogin) {
            let correctPassword = bcrypt.compareSync(req.body.passwordLogin, userToLogin.password);
            if (correctPassword) {
                // delete userToLogin.password
                // req.session.userLogged = userToLogin

                // if (req.body.remember) {
                //     res.cookie('userEmail' , req.body.email, {maxAge : (((1000 * 60) * 60)*24)}) // cookie de 24 hs
                // }

                return res.send('Bienvenido');
                res.cookie("login", "Hola usuario")
             } else {
                return res.render('login' , {
                    errors: {
                        passwordLogin: {
                            msg: 'Contraseña incorrecta'
                        }
                    },
                    old : req.body
                })
             }
        } else {
            return res.render('login' , {
                errors: {
                    usernameLogin: {
                        msg: 'El usuario con el que intenta ingresar no existe'
                    }
                }})
        }
	},

    perfil : (req,res) => {
        let id = req.params.id;
        libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));
        libros = libros.find(libro => libro.id == id);
        if (libros){
        res.render('perfil', {libros: libros});
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

module.exports = userController;