const express = require('express');
const router = express.Router();
const Mascota = require('../models/mascota');

router.post('/nuevaMascota', async(req,res) => {

    const mascota = new Mascota({
        nombre: req.body.nombre,
        especie: req.body.especie,
        raza: req.body.raza,
        sexo: req.body.sexo, 
        color: req.body.color,
        pelaje: req.body.pelaje,
        fechaNacimiento: req.body.fechaNacimiento
    });

    try {
        const saveMascota = await mascota.save();
        res.json(saveMascota)
    } catch (error) {
        res.json({message: error});
    }
});

router.get('/', async(req,res) => {

    try {
        const mascotas = await Mascota.find();
        res.json(mascotas)
    } catch (error) {
        res.json({message:error})
    }
})

router.get('/:mascotaId', async(req,res) => {
    try {
        const mascota = await Mascota.findById(req.params.mascotaId);
        if(!mascota){
            return res.status(404).json({message: 'Mascota no encontrada'});
        }
        res.json(mascota);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.delete('/:mascotaId', async(req, res) => {
    try {
        const deleteMascota = await Mascota.findByIdAndDelete(req.params.mascotaId);
        if(!deleteMascota){
            return res.status(404).json({message: 'Mascota no encontrada'});
        }
        res.json({message: 'Mascota eliminada exitosamente'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.patch('/:mascotaId', async(req, res) => {
    try {
        const updateMascota = await Mascota.findByIdAndUpdate(req.params.mascotaId, req.body, {new:true});
        if(!updateMascota){
            return res.status(404).json({message: 'Mascota no encontrada'});
        }
        res.json(updateMascota);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;