const { response } = require("express");
const { Op } = require('sequelize');
const db = require("../database/models");


module.exports = {

    list: (req, res) => {

        db.libro    
        .findAll()
        .then(libros => {
            return res.status(200).json({
                total: libros.length,
                data: libros,
                status: 200
            })
        })
      
    },

    mostrar: (req, res) => {
        const libroId = req.params.id;
        console.log("ID del libro recibido:", libroId);
    
        db.libro
            .findByPk(libroId)
            .then(libros => {
                if (!libros) {
                    return res.status(404).json({
                        error: "Libro no encontrado",
                        status: 404
                    });
                }
                console.log("Libro encontrado:", libros);
    
                return res.status(200).json({
                    data: libros,
                    status: 200
                });
            })
            .catch(err => {
                console.error("Error al buscar el libro:", err);
                return res.status(500).json({
                    error: "Error interno del servidor",
                    status: 500
                });
            });
    },

    crear : (req, res) => {
        // return res.json(req.body)
        // console.log(req.body); // Muestra los datos enviados en la solicitud

        db.libro
        .create(req.body)
        .then(libro => {
            return res.status(200).json({
                data: libro,
                status: 200,
                created: "ok"
            })
        })
       
    },


    eliminar: (req, res) => {

        const libroId = req.params.id;
        console.log("ID del libro recibido:", libroId);
        db.libro
        .destroy({
            where:{
                id: req.params.id
            }
        })
        .then(response => {
            return res.status(200).json(response)
        })
       
    },

    buscar: (req, res) => {

        console.log('Solicitud de búsqueda recibida.');
        const keyword = req.query.keyword;
        console.log('Palabra clave en la consulta:', keyword);

        if (!keyword) {
          // Maneja el caso en el que req.query.keyword no está definido
          return res.status(400).json({ error: 'Palabra clave no proporcionada en la consulta' });
        }

        db.libro
        .findAll({
          where: {
            nombre: { [Op.like]: '%' + keyword + '%' }
          }
        })
        
        .then(libros => {
          return res.status(200).json(libros);
        });
    }

}