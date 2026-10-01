const express = require('express');
const router = express.Router();
const activoController = require('../controllers/activoController');

//Endpoint
router.get('/', activoController.obtenerActivos);
router.get('/:id', activoController.obtenerActivoPorID);
router.post('/', activoController.crearActivo);
router.put('/:id', activoController.actualizarActivo);
router.delete('/:id', activoController.eliminarActivo);


module.exports = router;