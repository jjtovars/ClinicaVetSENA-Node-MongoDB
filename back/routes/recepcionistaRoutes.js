const express = require('express');
const router = express.Router();
const Recepcionista = require('../models/recepcionista');

router.post('/nuevoRecepcionista', async(req, res) => {


    const identificacionExistente = await Recepcionista.findOne({identificacion: req.body.identificacion});
    if(identificacionExistente){
        return res.status(400).json({message: 'Identificacion ya esta en uso'});
    }


    const recepcionista = new Recepcionista({

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
});

router.get('/', async(req,res) => {
    try {
        const receocionistas = await Recepcionista.find();
        res.json(receocionistas);
    } catch (error) {
        res.json({message:error});
    }
});

router.get('/:recepcionistaId', async(req,res) => {
    try {
        const recepcionista = await Recepcionista.findById(req.params.recepcionistaId);
        if(!recepcionista){
            return res.status(404).json({message: 'Recepcionista no encontrado'});
        }
        res.json(recepcionista)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.delete('/:recepcionistaId', async(req,res) => {
    try {
        const deleteRecepcionista = await Recepcionista.findByIdAndDelete(req.params.recepcionistaId);
        if(!deleteRecepcionista){
            return res.status(404).json({message: "Recepcionista no encontrado"});
        }
        res.json({message: 'Recepcionista eliminado exitosamente'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.patch('/:recepcionistaId', async(req,res) => {
    try {
        const updateRecepcionista = await Recepcionista.findByIdAndUpdate(req.params.recepcionistaId, req.body, {new:true});
        if(!updateRecepcionista){
            return res.status(404).json({message: 'Recepcionista no encontrado'});
        }
        res.json(updateRecepcionista);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;