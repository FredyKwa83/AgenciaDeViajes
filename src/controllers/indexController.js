
const controller ={
    
    index : (req, res) => {
        //res.sendFile((__dirname + '/views/index.html'));
        res.render('index');
    },

    detalledeProducto : (req, res) => {
        //res.sendFile((__dirname + '/views/detalleProducto.html'));
        res.render('detalleProducto');
    },

    cart : (req, res) => {
        //res.sendFile((__dirname + '/views/cart.html'));
        res.render('cart');
    }
}

module.exports = controller;