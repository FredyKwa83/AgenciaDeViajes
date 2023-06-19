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

app.listen(3009, function () {
    console.log("Servidor corriendo");
});




