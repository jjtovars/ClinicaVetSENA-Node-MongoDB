const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

router.post('/nuevoProducto', async(req, res) => {

    const producto = new Producto({
        codigo: req.body.codigo,
        categoria: req.body.categoria,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio
    });

    try {
        const savedProducto = await producto.save();
        res.json(savedProducto);
    } catch (error) {
        res.json({message: error});
    }
});


router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:productoId', async(req,res) => {
    try {
        const producto = await Producto.findById(req.params.productoId);
        if(!producto){
            return res.status(404).json({message: 'Producto no encontrado'})
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.delete('/:productoId', async(req, res) => {
    try {
        const deleteProducto = await Producto.findByIdAndDelete(req.params.productoId);
        if(!deleteProducto){
            return res.status(404).json({message: "Producto no encontrado"})
        }
        res.json({message: 'Producto eliminado exitosamente'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.patch('/:productoId', async(req,res) => {
    try {
        const updateProducto = await Producto.findByIdAndUpdate(req.params.productoId, req.body, {new: true});
        if(!updateProducto){
            return res.status(404).json({message: 'Producto no encontrado'});
        }
        res.json(updateProducto);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;