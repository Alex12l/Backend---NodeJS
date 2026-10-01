// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
//Necesitaremos los datos del archivo .env
require('dotenv').config();
module.exports = {
  //normalemente se debe configurar 2 BD(Produccion / desarrollo)
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'logistica'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  }


};
