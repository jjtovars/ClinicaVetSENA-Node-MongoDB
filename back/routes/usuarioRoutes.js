const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const Recepcionista = require('../models/recepcionista')
const Veterinario = require('../models/veterinario');




//Ruta para crear un usuario
router.post('/registro', async(req,res) => {
    try {
        // Verificar si el usuario ya está registrado como recepcionista
        const recepcionistaExistente = await Recepcionista.findOne({ correo: req.body.correo });
        if (!recepcionistaExistente) {
            return res.status(400).send('El correo no está registrado como recepcionista');
        }

        // Verificar si el correo ya está registrado como usuario
        const usuarioExistente = await Usuario.findOne({ correoUsuario: req.body.correo });
        if (usuarioExistente) {
            return res.status(400).send('El correo ya está registrado como usuario');
        }

        // Verificar que el rol sea válido
        const rolesPermitidos = ['Administrador', 'Veterinario', 'Recepcionista'];
        if (!rolesPermitidos.includes(req.body.rol)) {
            return res.status(400).send('Rol no válido. Los roles permitidos son: Administrador, Veterinario, Recepcionista');
        }

        // Crear usuario
        const usuario = new Usuario({
            correoUsuario: req.body.correo,
            password: req.body.password,
            rol: req.body.rol
        });

        const savedUsuario = await usuario.save();
        res.json(savedUsuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ruta para Login
router.post('/login', async (req, res) => {
    // const { username, password } = req.body;
    try {
        const usuario = await Usuario.findOne({correoUsuario: req.body.correoUsuario});
        if (!usuario) {
            return res.status(401).json({ message: 'El usuario no está registrado' });
        }
        if (usuario.password !== req.body.password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        
        if(usuario.rol !== req.body.rol){
            return res.status(401).json({ message: 'Este no es el rol para este usuario' });
        }
        
        res.json({ message: 'Autenticación satisfactoria' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;