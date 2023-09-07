function pagosData (sequelize, Datatypes){
    
    let alias = 'pago';

    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        descripcion: {type: Datatypes.STRING(100)},
    }

    let config = {camelCase: false, timestamps: false};

    const pago = sequelize.define(alias, cols, config);

    pago.associate = function (model){
        pago.hasMany(model.envio, {
            as: 'envio',
            foreignKey: 'id_pago'
        })
    }

    return pago;
}

module.exports = pagosData;