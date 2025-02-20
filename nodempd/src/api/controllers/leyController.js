
const pool = require("../../db")
require('dotenv').config();
const schema = process.env.DB_SCHEMA;

exports.getley = async (req, res) => {
  console.log("getley ");
 try { 
  const response = await pool.query("SELECT id, nombre, descripcion, fechapublicacion, pais FROM " + schema + ".ley ORDER BY id ASC");
  res.status(200).json(response.rows);
} catch (error) {
  return res.status(400).json({ error: error.message });
}

};

exports.getleycampos = async (req, res) => {
  console.log("getleycampos ");
 try { 
  const consulta = "SELECT l.id, l.nombre, l.descripcion, l.fechapublicacion, l.pais, c.\"nombreCorto\" AS descripcionPais " + 
    " FROM " + schema + ".ley AS l, " + schema + ".cdu AS c " +
    " WHERE l.pais = c.id " +
    " ORDER BY id ASC"
  const response = await pool.query(consulta);
  res.status(200).json(response.rows);
} catch (error) {
  return res.status(400).json({ error: error.message });
}

};

exports.getleyById = async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log("Token recibido:", token);
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT id, nombre, descripcion, fechapublicacion, pais FROM " + schema + ".ley WHERE id = $1", [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

exports.getleybynombre = async (req, res) => {
  try {
    const nombre = req.params.nombre;
    console.log("API getleybynombre. Nombre recibido:-" + nombre + "-")
    const response = await pool.query("SELECT id, nombre, descripcion, fechapublicacion, pais FROM " + schema + ".ley WHERE nombre = $1", [nombre]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

exports.createley = async (req, res) => {
  try {
    const { nombre, descripcion, fechapublicacion, pais } = req.body;
    const fechaPublicacionFormateada = new Date(fechapublicacion);
    const timestampNow = new Date();
    /*
    console.log("En postLey - this.selectedLey.nombre: " + nombre + 
      " descripcion: " + descripcion +
      " fechapublicacion: " + fechapublicacion +
      " pais: " + pais);
    */
    const { rows } = await pool.query(
      "INSERT INTO " + schema + ".ley " +
      //"(nombre, descripcion, fechapublicacion, pais, createdat, updatedat)" +
      "(nombre, descripcion, fechapublicacion, pais)" +
      //" VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      " VALUES ($1, $2, $3, $4 ) RETURNING *",
      //[nombre, descripcion, fechapublicacion, pais, timestampNow, timestampNow]
      [nombre, descripcion, fechapublicacion, pais]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateley = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, fechapublicacion, pais } = req.body;
    const fechapublicacionFormateada = new Date(fechapublicacion);
    const { rows } = await pool.query(
      "UPDATE " + schema + ".ley SET nombre = $2, descripcion = $3, fechapublicacion = $4, pais = $5 WHERE id = $1 RETURNING *",
      [id, nombre, descripcion, fechapublicacionFormateada, pais]
    );
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.deleteley = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { rowCount } = await pool.query("DELETE FROM " + schema + ".ley where id = $1", [
      id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ message: "ley not found" });
    }
    return res.status(200).json({ eliminado: "ELIMINADO" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};