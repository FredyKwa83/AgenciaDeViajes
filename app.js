const express = require('express');
const path = require('path');
const app = express();

const router = require('./src/routes/indexRouter');
const router1 = require('./src/routes/userRouter');

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

app.use(router);
app.use(router1);


/**bootstrap */
app.use("/css",express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))

app.use("/js",express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
/**bootstrap  */

app.listen(3001, function () {
    console.log("Servidor corriendo");
});




