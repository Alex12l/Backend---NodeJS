/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('activos').del();
  await knex('categorias').del();
 
  await knex('categorias').insert([
    {categoria: 'Equipos de Computo'},
    {categoria: 'Mobiliario'},
    {categoria: 'Herramientas'},

  ]);

  await knex('activos').insert([
    {
      idcategoria: 1,
      descripcion: 'laptop Lenovo Core i7',
      fotografia: 'laptop_lenovo.jpg',
      estado: 'Disponible',
      precio: 1900.0

    },
        {
      idcategoria: 1,
      descripcion: 'Monitor Curvo Samsung 27',
      fotografia: 'monitor_samsung.jpg',
      estado: 'Mantenimiento',
      precio: 680.0

    },
        {
      idcategoria: 2,
      descripcion: 'Silla gerencial',
      fotografia: 'silla_gerencia.jpg',
      estado: 'Disponible',
      precio: 500.0

    }
  ]);
};
