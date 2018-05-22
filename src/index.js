// Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT=process.env.PORT || 3000;

// Inicializar variables
const app = express();


// CORS
app.use(function(req, res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Importar rutas
const appRoutes = require('./routes/user');


// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/usersDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});


app.use('/', appRoutes);

// Escuchar peticiones
app.listen(PORT, () => {
    console.log(`Express server on port ${PORT}: \x1b[32m%s\x1b[0m`, 'online');
});
