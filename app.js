const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get('/page', (req, res) => {
    res.sendFile((__dirname + '/views/index.html'));
});


app.listen(3002, function () {
    console.log("Servidor corriendo");
});

// agregue un comentario 
//agregue otro comentario
// agregue un cometario adicional att D.F.G