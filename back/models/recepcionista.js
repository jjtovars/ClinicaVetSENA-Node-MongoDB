const mongoose = require('mongoose');

const recepcionistaSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    }, 
    identificacion: {
        type: String,
        require: true,
        unique: true
    },
    nombres: {
        type: String,
        require: true
    }, 
    apellidos: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true
    },
    telefono: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = mongoose.model('recepcionista', recepcionistaSchema);