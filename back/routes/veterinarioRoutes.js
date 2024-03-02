const express = require('express');
const router = express.Router();
const Veterinario = require('../models/veterinario');

router.post('/nuevoVeterinario', async(req, res) => {


    // Verificar si ya existe un veterinario con la misma identificación
    const existingVeterinario = await Veterinario.findOne({ identificacion: req.body.identificacion });
    
    if (existingVeterinario) {
        // Si ya existe un veterinario con la misma identificación, devuelve un mensaje de error
        return res.status(400).json({ message: 'La identificación ya está en uso.' });
    }


    const veterinario = new Veterinario({

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
});

router.get('/', async(req,res) => {
    try {
        const veterinarios = await Veterinario.find();
        res.json(veterinarios);
    } catch (error) {
        res.json({message:error});
    }
});

router.get('/:veterinarioId', async(req,res) => {
    try {
        const veterinario = await Veterinario.findById(req.params.veterinarioId);
        if(!veterinario){
            return res.status(404).json({message: 'Veterinario no encontrado'});
        }
        res.json(veterinario)
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.delete('/:veterinarioId', async (req,res) => {
    try {
        const deleteVeterinario = await Veterinario.findByIdAndDelete(req.params.veterinarioId);
        if(!deleteVeterinario){
            return res.status(404).json({message: 'Veterinario no encontrado'});
        }
        res.json({message: 'Veterinario eliminado exitosamente'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.patch('/:veterinarioId', async(req,res) => {
    try {
        const updateVeterinario = await Veterinario.findByIdAndUpdate(req.params.veterinarioId, req.body, {new:true});
        if(!updateVeterinario){
            return res.status(404).json({message: 'Veterinario no encontrado'});
        }
        res.json(updateVeterinario);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;