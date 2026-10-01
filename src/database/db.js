const knex = require('knex');
const knexfile = require('../../knexfile');

//Seleccionamos el entorno (desarrollo o produccion)
const environment = process.env.NODE_ENV || 'development';
const confiOptions = knexfile[environment];

//creamos la instancia
const db = knex(confiOptions);

//Exportarlo para poder usarlo en otro entorno
module.exports = db;