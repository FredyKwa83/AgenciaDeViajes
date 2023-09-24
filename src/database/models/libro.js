function librosData (sequelize, Datatypes){
    
    let alias = 'libro';

    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.STRING(50)},
        descripcion: {type: Datatypes.STRING(1500)},
        precio: {type: Datatypes.STRING(50)},
        descuento: {type: Datatypes.STRING(50)},
        imagen: {type: Datatypes.STRING(50)}
    }

    let config = {camelCase: false, timestamps: false};

    const libro = sequelize.define(alias, cols, config);

    libro.associate = function(model){
        libro.hasMany(model.usuario, {
            as: 'usuario',
            foreignKey: 'id_libro'
        })
    
        libro.belongsToMany(model.categoria, {
            as: 'categoria',
            through: 'libro_categoria', // tabla intermedia
            foreignKey: 'id_libro', // es el FK del modelo en el que estas (en la tabla intermedia de la bd)
            otherKey: 'id_categoria' ,           // es el FK del otro modelo (en la tabla intermedia de la bd)
            timestamps: false

        })
    
        libro.hasMany(model.puntaje, {
            as:'puntaje',
            foreignKey:'id_libro'
        })
    }

    return libro;

}

module.exports = librosData; 