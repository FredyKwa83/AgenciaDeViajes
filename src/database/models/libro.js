function librosData (sequelize, Datatypes){
    
    let alias = 'libro';

    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.STRING(50)},
        descripcion: {type: Datatypes.STRING(100)},
        precio: {type: Datatypes.STRING(50)}
    }

    let config = {camelCase: false, timestamps: false};

    const libro = sequelize.define(alias, cols, config);

    return libro;

}

module.exports = librosData; 