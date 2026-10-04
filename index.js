const express = require('express');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos públicos
app.use(express.static('public'));

// Importamos las rutas
const categoriaRoutes = require('./src/routers/categoriaRoutes');
const activoRoutes = require('./src/routers/activoRoutes');

// Implementar rutas
app.use('/api/categorias', categoriaRoutes);
app.use('/api/activos', activoRoutes);

// Ruta general
app.get("/", (req, res) => {
    res.send("API de Logistica funcionando correctamente");
});

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});