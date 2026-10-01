/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  //1. Crear la tabla categorias
  await knex.schema.createTable('categorias', (table) => {
    table.increments('id').primary();
    table.string('categoria', 100).notNullable();
  });

  //2. Crear tabla activos
  await knex.schema.createTable('activos', (table) => {
    table.increments('id').primary();
    table.integer('idcategoria').unsigned().notNullable();
    table.string('descripcion', 150).notNullable();
    table.string('fotografia', 255).nullable();
    table.string('estado', 50).defaultTo('Disponible');
    table.decimal('precio',8,2).notNullable();                     
    table.timestamp('fecharegistro').defaultTo(knex.fn.now()); //Guarda la fecha actual

    //Restriccion foranea
    table.foreign('idcategoria')
    .references('id')
    .inTable('categorias')
    .onDelete('RESTRICT');

  });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  //Eliminar las tablas
  await knex.schema.dropTableIfExists('activos');
  await knex.schema.dropTableIfExists('categorias');
  
};
