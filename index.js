const express = require('express');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;


//Middleware ya que la comunicacion se hace por JSON
app.use(express.json());

//Importamos las rutas de la categoria
const categoriaRoutes = require('./src/routers/categoriaRoutes');
const activoRoutes = require('./src/routers/activoRoutes');


//Implementar rutas
app.use('/api/categorias', categoriaRoutes);
app.use('/api/activos', activoRoutes);

//Ruta general de toda la app
//http://localhost:3000
app.get("/",(req,res)=>{
    res.send("API de Logistica funcionando correctamente");
});
//Iniciamos el servidor
app.listen(PORT, ()=>{
    console.log("Servidor iniciado en http://localhost:3000");
});