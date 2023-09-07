function enviosData (sequelize, Datatypes){
    
    let alias = 'envio';

    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        id_pago: {type: Datatypes.INTEGER},
        fecha: {type: Datatypes.DATE},
        costo: {type: Datatypes.INTEGER},
        emailContacto: {type: Datatypes.STRING(50)},
        id_usuario: {type: Datatypes.INTEGER}
    }

    let config = {camelCase: false, timestamps: false};

    const envio = sequelize.define(alias, cols, config);

    envio.associate = function (model){   //HACER TABLA PAGO
        envio.belongsTo(model.pago, {
            as: 'pago',
            foreignKey: 'id_pago'
        })
    }

    envio.associate = function (model){
        envio.belongsTo(model.usuario, {
            as: 'usuario',
            foreignKey: 'id_usuario'
        })
    }

    return envio 
}

module.exports = enviosData; 