function puntajesData (sequelize, Datatypes){
    
    let alias = 'puntaje';

    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        id_libro: {type: Datatypes.INTEGER},
        valoracion: {type: Datatypes.STRING(50)},
        comentarios: {type: Datatypes.STRING(1500)}
    }

    let config = {camelCase: false, timestamps: false};

    const puntaje = sequelize.define(alias, cols, config);


    puntaje.associate = function(model){
        puntaje.belongsTo(model.libro, {
            as:'libro',
            foreignKey: 'id_libro'
        })
    }

    return puntaje;

}

module.exports = puntajesData;