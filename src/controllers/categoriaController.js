//Acceso a la BD
//Anteriormente ...
//mysql_connect()
//poolConnection()
//Ahora: knex (responsabilidad conexion) : orm
const db = require("../database/db");

//En este archivo solo se crean metodos
//no se definen las rutas ni los verbos (GET, POST, PUT, DELETE)
const obtenerCategorias = async(req, res) =>{
  try {
    //Consulta > OMR
    const categorias = await db('categorias').select('*');
    return res.status(200).json({
      success: true,
      data:categorias
    });

  }catch (error) {
    console.error('Error al leer categorias:', error);//Desarrollador
    return res.status(500).json({ success: false, message: 'Error al obtener categorias'}); //Usuario
  }
}

const obtenerCateoriaPorId = async(req, res) =>{
  try{
    //La busqueda necesita el ID que pasa en la URL
    const {id} = req.params;
    const categoria = await db('categorias').where({id}).first();

    if(!categoria){
      return res
      .status(404)
      .json({ success: false, message: 'No existe esta categoria'});
    }
    return res
    .status(200)
    .json({success: true, data: categoria});

  }catch (error) {
  console.log('No se pudo ejecutar ls busqueda:', error);//Desarrollador
  return res
  .status(500)
  .json({ success: false, message: 'Error interno en el servidor'}); //Usuario
  }
}

const crearCategoria = async(req, res) =>{
  try{
    const {categoria} = req.body;
    if(!categoria){
      return res
      .status(400)
      .json({ success: false, message: 'El campo categoria es obligatorio'});
    }

    const [idGenerado] = await db('categorias').insert({categoria});

    return res.status(201).json({
      success: true,
      message: 'Categoria creada correctamente',
      data: {id: idGenerado}
    });
  }catch (error) {
    console.error('Error al crear categoria:', error);//Desarrollador
    return res
    .status(500)
    .json({ success: false, message: 'Error al crear categoria'}); //Usuario
  }
}

const actualizarCategoria = async(req, res) =>{
  try{
    //Obtener el ID de la URL (parametro)
    const {id} = req.params;

    //Obtener los datos del JSON (cuerpo)
    const {categoria} = req.body;
    //Const {idcategoria, descripcion, fotografia, estado, precio} = req.body;

    if(!categoria){
      return res
      .status(400)
      .json({ success: false, message: 'El campo categoria es obligatorio'});
    }

    const filasAfectadas = await db("categorias").where({id}).update({categoria});
    
    if(!filasAfectadas){
      return res
      .status(404)
      .json({ success: false, message: 'No existe esta categoria'});
    }

    //Hemos pasado las validaciones
    return res
    .status(200)
    .json({ success: true, message: 'Categoria actualizada correctamente'});

  }catch (error) {
    console.error('no es posible actualizar: ', error);//Desarrollador
    return res
    .status(500)
    .json({ success: false, message: 'No es posible actualizar la categoria'}); //Usuario
  }
}

const eliminarCategoria = async(req, res) =>{
  try{
    const {id} = req.params;
    const filasAfectadas = await db("categorias").where({id}).del();

    if(!filasAfectadas){
      return res
      .status(404)
      .json({ success: false, message: 'No existe esta categoria'});
    }
    return res
    .status(200)
    .json({ success: true, message: 'Categoria eliminada correctamente'});
    
  }catch (error) {
    console.error('no es posible eliminar: ', error);//Desarrollador
    return res
    .status(500)
    .json({ success: false, message: 'No es posible eliminar la categoria'}); //Usuario
  }
}

//Estas acciones deben ser de utilidad (necesarias) para las rutas
module.exports = {
  obtenerCategorias,
  obtenerCateoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
}