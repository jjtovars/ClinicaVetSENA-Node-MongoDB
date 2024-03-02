const mongoose = require('mongoose');

const recepcionistaSchema = mongoose.Schema({

    identificacion: {
        type: String,
        required: true,
        unique: true
    },
    nombres: {
        type: String,
        required: true
    }, 
    apellidos: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('recepcionista', recepcionistaSchema);