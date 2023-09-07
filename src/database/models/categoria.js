function categoriasData (sequelize, Datatypes){
    
    let alias = 'categoria';

    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.STRING(50)}
    }

    let config = {camelCase: false, timestamps: false};

    const categoria = sequelize.define(alias, cols, config);

    categoria.associate = function (model){
        categoria.belongsToMany(model.libro, {
            as: 'libro',
            through: 'libro_categoria', // tabla intermedia
            foreignKey: 'id_categoria', // es el FK del modelo en el que estas (en la tabla intermedia de la bd)
            otherKey: 'id_libro' ,           // es el FK del otro modelo (en la tabla intermedia de la bd)
            timestamps: false

        })
    }

    return categoria;

}

module.exports = categoriasData; 