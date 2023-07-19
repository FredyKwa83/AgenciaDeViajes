const express = require('express');
const path = require('path');
const app = express();

const indexRouter = require('./src/routes/indexRouter');
const userRouter = require('./src/routes/userRouter');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE


app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

app.use(indexRouter);
app.use(userRouter);


/**bootstrap */
app.use("/css",express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))

app.use("/js",express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
/**bootstrap  */

app.listen(3004, function () {
    console.log("Servidor corriendo");
});




