const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get('/page', (req, res) => {
    res.sendFile((__dirname + '/views/index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile((__dirname + '/views/register.html'));
});

app.get('/producto', (req, res) => {
    res.sendFile((__dirname + '/views/detalleProducto.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile((__dirname + '/views/cart.html'));
});

/**bootstrap */
app.use("/css",express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))

app.use("/js",express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
/**bootstrap  */

app.listen(3001, function () {
    console.log("Servidor corriendo");
});




