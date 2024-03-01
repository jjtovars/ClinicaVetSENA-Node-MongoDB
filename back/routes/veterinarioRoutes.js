const express = require('express');
const router = express.Router();
const Veterinario = require('../models/veterinario');

router.post('/nuevoVeterinario', async(req, res) => {

    const veterinario = new Veterinario({
        id: req.body.id,
        identificacion: req.body.identificacion,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        especialidad: req.body.especialidad,
        correo: req.body.correo,
        rol: 'Veterinario'
    });
    try {
        const savedVeterinario = await veterinario.save();
        res.json(savedVeterinario)
    } catch (error) {
        res.json({message:error});
    }
})

module.exports = router;