const mongoose = require('mongoose');

const veterinarioSchema = mongoose.Schema({
    identificacion: {
        type: String,
        required: true,
        unique: true // Esto asegura que cada identificación sea única
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
    especialidad: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true // Esto asegura que cada correo sea único
    }
});

module.exports = mongoose.model('veterinario', veterinarioSchema);