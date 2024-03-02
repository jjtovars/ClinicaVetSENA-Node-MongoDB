const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());

const usuarioRoute = require('./routes/usuarioRoutes');
const recepcionistaRoute = require('./routes/recepcionistaRoutes');
const veterinarioRoute = require('./routes/veterinarioRoutes');
const clienteRoute = require('./routes/clienteRoutes');
const productoRoute = require('./routes/productoRoutes');

app.use('/clinivetSENA/usuarios', usuarioRoute);
app.use('/clinivetSENA/recepcionistas', recepcionistaRoute);
app.use('/clinivetSENA/veterinarios', veterinarioRoute);
app.use('/clinivetSENA/clientes', clienteRoute);
app.use('/clinivetSENA/productos', productoRoute);

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