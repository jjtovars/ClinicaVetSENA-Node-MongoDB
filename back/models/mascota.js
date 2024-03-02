const mongoose = require('mongoose');

const mascotaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    especie: {
        type: String,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    }, 
    color: {
        type: String,
        required: true
    },
    pelaje: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Mascota', mascotaSchema);