const fs = require('fs');
const path = require('path');
const {all,findByField,generate,write} = require('../models/usersModel');

const {validationResult} = require('express-validator');

const db = require ('../database/models')

const bcrypt = require('bcryptjs');

const librosFilePath = path.join(__dirname, '../database/librosDataBase.json');
let libros = JSON.parse(fs.readFileSync(librosFilePath, 'utf-8'));
const usuariosFilePath = path.join(__dirname, '../database/usuarios.json');
let usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const userController ={

    register: (req, res) => {
            res.render('register');
    },

	registerPOST: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) { 
            return res.render('register' , {errors: resultValidation.mapped() , old : req.body})
        } else {
            db.usuario.create({
                nombre: req.body.nombre,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                username: req.body.username,
                rol: req.body.rol,
            })

            res.render('login'); 

		}
	},

    login :(req, res) => {
        res.render('login');
    },

	loginPOST : async(req, res) => {
        try {
            const resultValidation = validationResult(req)
            if (resultValidation.errors.length > 0) {
                return res.render('user/login', {
                    errors: resultValidation.mapped(),
                    old : req.body
                });
            }
            const userToLogin = await db.usuario.findOne({where: {username: req.body.username}});
            if(!userToLogin){
                return res.render('login', {
                    errors: {username: {msg: 'El usuario con el que intenta ingresar no existe'}}
                });
            }
            const correctPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (correctPassword){
                req.session.userLogged = userToLogin;
                return res.redirect("perfil");
            
            } else { 
                return res.render('login' , {
                    errors: {password: {msg: 'Contraseña incorrecta'}}, old : req.body
                });
            }
            }catch (error) { 
                console.log(error.message); 
            }
	},

    perfil : async(req,res) => {
        try {
            return res.render('perfil', {usuario: req.session.userLogged});
        }
        catch (error) { 
            console.log(error.message); 
        }
    },

    create: (req, res) => {
        db.categoria.findAll()
            .then(function(generos){
                return res.render('libro-create-form', {generos: generos});
            })
	},
    store: (req, res) =>{
        db.libro.create({
            nombre: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            descuento: req.body.descuento,
            genero: req.body.genero,
            descuento: req.body.descuento
        });
        res.redirect('/'); // manda el producto al index
    },

    



    }


module.exports = userController;