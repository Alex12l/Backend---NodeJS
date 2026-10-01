const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

//Endpoint
router.get('/', categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCateoriaPorId);
router.post('/', categoriaController.crearCategoria);
router.put('/:id', categoriaController.actualizarCategoria);
router.delete('/:id', categoriaController.eliminarCategoria);


module.exports = router;
