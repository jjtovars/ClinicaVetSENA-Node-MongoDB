const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    correoUsuario: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    rol: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('usuario', usuarioSchema)