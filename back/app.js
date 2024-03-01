const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());

const usuariosRoute = require('./routes/usuarioRoutes');
app.use('/clinivetSENA', usuariosRoute);

const recepcionistaRoute = require('./routes/recepcionistaRoutes');
app.use('/clinivetSENA', recepcionistaRoute);

const veterinarioRoute = require('./routes/veterinarioRoutes');
app.use('/clinivetSENA', veterinarioRoute);

app.get('/', (req, res) => {
    res.send('Prueba 1 respuesta del servidor');
});

mongoose.connect('mongodb://localhost:27017/CliniVetSENA')
.then(() => {
    console.log('Conexion establecida a la base de datos mongoDB Compass')
})
.catch((err) => {
    console.log('Error al conectar la base de datos: ', err)
})

app.listen(10000);