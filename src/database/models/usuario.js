function usuariosData (sequelize, Datatypes){
    
    let alias = 'usuario';

    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.STRING(50)},
        email: {type: Datatypes.STRING(50)},
        fechacreacion: {type: Datatypes.DATE},
        fechaeliminacion: {type: Datatypes.DATE},
        rol: {type: Datatypes.ENUM('C', 'A')} ,
        id_libro: {type: Datatypes.INTEGER} 
    }

    let config = {camelCase: false, timestamps: false};

    const usuario = sequelize.define(alias, cols, config);

    usuario.associate = function (model){
        usuario.belongsTo(model.libro,{
            as: 'libros',
            foreignKey: 'id_libro'
        })
    }

    usuario.associate = function(model){
        usuario.hasMany(model.envio, {
            as: 'envio',
            foreignKey: 'id_usuario'
        })
    }

    return usuario;

}

module.exports = usuariosData; 