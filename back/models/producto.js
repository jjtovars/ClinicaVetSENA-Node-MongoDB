const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({

    codigo: {
        type: String,
        required: true,
        unique: true
    },
    categoria: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('producto', productoSchema)