
const pool = require("../../db")
require('dotenv').config();
const schema = process.env.DB_SCHEMA;

exports.getley = async (req, res) => {
 try { 
  const response = await pool.query("SELECT id, nombre, descripcion, fechapublicacion, pais FROM " + schema + ".ley ORDER BY id ASC");
  res.status(200).json(response.rows);
} catch (error) {
  return res.status(400).json({ error: error.message });
}

};

exports.getleyById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT id, nombre, descripcion, fechapublicacion, pais FROM " + schema + ".ley WHERE id = $1", [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

exports.createley = async (req, res) => {
  try {
    const { nombre, descripcion, fechaPublicacion, pais } = req.body;
    const fechaPublicacionFormateada = new Date(fechaPublicacion);
    const timestampNow = new Date();
    const { rows } = await pool.query(
      "INSERT INTO " + schema + ".ley " +
      "(nombre, descripcion, fechapublicacion, pais, createdat, updatedat)" +
      " VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [nombre, descripcion, fechaPublicacionFormateada, pais, timestampNow, timestampNow]
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