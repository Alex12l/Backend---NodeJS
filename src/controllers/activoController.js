const db = require("../database/db");

//metodos
const obtenerActivos = async (req, res) => {
  try {
    const activos = await db("activos").select("*");
    return res.status(200).json({ success: true, data: activos });
  } catch (error) {
    console.error("Error al leer los activos:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error al obtener activos" });
  }
};

const obtenerActivoPorID = async (req, res) => {
  try {
    const { id } = req.params;
    const activos = await db("activos").where({ id }).first();

    if (!activos) {
      return res
        .status(404)
        .json({ success: false, message: "No existe este activo" });
    }
    return res.status(200).json({ success: true, data: activos });
  } catch (error) {
    console.log("No se pudo realizar la busqueda", error);
    return res
      .status(500)
      .json({ success: false, message: "Error interno en el servidor" });
  }
};

const crearActivo = async (req, res) => {
  try {
    const { idcategoria, descripcion, fotografia, estado, precio } = req.body;

    if (!idcategoria || !descripcion || !fotografia || !estado || !precio) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const [idGenerado] = await db("activos").insert({
      idcategoria,
      descripcion,
      fotografia,
      estado,
      precio,
    });

    return res.status(201).json({
      success: true,
      message: "Activo creado correctamente",
      data: { id: idGenerado },
    });
  } catch (error) {
    console.error("Error al crear el activo", error);
    return res
      .status(500)
      .json({ success: false, message: "Error al crear el activo" });
  }
};

const actualizarActivo = async (req, res) => {
  try {
    const { id } = req.params;
    const { idcategoria, descripcion, fotografia, estado, precio } = req.body;

    if (!idcategoria || !descripcion || !fotografia || !estado || !precio) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const filasAfectadas = await db("activos").where({ id }).update({
      idcategoria,
      descripcion,
      fotografia,
      estado,
      precio,
    });

    if(!filasAfectadas){
      return res
      .status(404)
      .json({success:false, message:'No existe este activo'});
    }

    return res.status(200).json({
      success: true,
      message: "El activo fue actalizado correctamente",
    });
  } catch (error) {
    console.error("no fue posible actualizar", error);
    return res
      .status(500)
      .json({ success: false, message: "No es posible actualizar el activo" });
  }
};

const eliminarActivo = async (req, res) => {
  try {
    const { id } = req.params;
    const  filasAfectadas  = await db("activos").where({ id }).del();

    if (!filasAfectadas) {
      return res
        .status(404)
        .json({ success: false, message: "No existe este activo" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Se elimino el activo correctamente" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Que no es posible eliminar este activo",
    });
  }
};
module.exports = {
  obtenerActivos,
  obtenerActivoPorID,
  crearActivo,
  actualizarActivo,
  eliminarActivo,
};
