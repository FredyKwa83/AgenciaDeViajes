function categoriasData (sequelize, Datatypes){
    
    let alias = 'categoria';

    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.STRING(50)}
    }

    let config = {camelCase: false, timestamps: false};

    const categoria = sequelize.define(alias, cols, config);

    return categoria;

}

module.exports = categoriasData; 