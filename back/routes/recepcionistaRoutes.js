const express = require('express');
const router = express.Router();
const Recepcionista = require('../models/recepcionista');

router.post('/nuevoRecepcionista', async(req, res) => {



    // Verificar si el correo existe en la colección de Recepcionista
    const recepcionistaExistente = await Recepcionista.findOne({ correo: req.body.correoUsuario });
    if (recepcionistaExistente) {
        return res.status(400).send('El correo ya está en uso');
    }




    const recepcionista = new Recepcionista({
        id: req.body.id,
        identificacion: req.body.identificacion,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        correo: req.body.correo,
        rol: 'Recepcionista'
    });
    try {
        const savedRecepcionista = await recepcionista.save();
        res.json(savedRecepcionista)
    } catch (error) {
        res.json({message:error});
    }
})

module.exports = router;