const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

router.post('/nuevoCliente', async(req,res) => {

    const cliente = new Cliente({

        identificacion: req.body.identificacion,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        departamento: req.body.departamento,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        correo: req.body.correo
    });

    try {
        const savedCliente = await cliente.save();
        res.json(savedCliente);
    } catch (error) {
        res.json({message:error});
    }
});

router.get('/', async(req,res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.json({message:error});
    }

});

router.get('/:clienteId', async(req,res) => {
    try {
        const cliente = await Cliente.findById(req.params.clienteId);
        if(!cliente){
            return res.status(404).json({message: 'Cliente no encontrado'})
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.delete('/:clienteId', async(req,res) => {
    try {
        const deleteCliente = await Cliente.findByIdAndDelete(req.params.clienteId);
        if(!deleteCliente){
            return res.status(404).json({message: 'Cliente no encontrado'});
        }
        res.json({message: 'Cliente eliminado exitosamente'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.patch('/:clienteId', async(req, res) => {
    try {
        const updateCliente = await Cliente.findByIdAndUpdate(req.params.clienteId, req.body, {new:true});
        if(!updateCliente){
            return res.status(404).json({message: 'Cliente no encontrado'});
        }
        res.json(updateCliente)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;

