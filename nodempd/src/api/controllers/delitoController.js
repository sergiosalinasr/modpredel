
const pool = require("../../db")
require('dotenv').config();
const schema = process.env.DB_SCHEMA;

exports.getdelito = async (req, res) => {
  console.log("getdelito ");
 try { 
  const response = await pool.query("SELECT id, idley, nombre, descripcion, sancion, nivelgravedad FROM " + schema + ".delito ORDER BY id ASC");
  res.status(200).json(response.rows);
} catch (error) {
  return res.status(400).json({ error: error.message });
}

};

exports.getdelitocampos = async (req, res) => {
  console.log("getdelitocampos ");
 try { 
  const consulta = "SELECT d.id, " +
     " d.nombre,  " +
     " d.descripcion,  " +
     " d.sancion, cs.\"nombreCorto\" AS descsancion,  " +
     " d.nivelgravedad, cng.\"nombreCorto\" AS descnivelgravedad  " +
     " FROM mpd.delito AS d, mpd.cdu AS cs, mpd.cdu AS cng  " +
     " WHERE d.sancion = cs.id  " +
     " AND d.nivelgravedad = cng.id  " +
     " ORDER BY id ASC"
  const response = await pool.query(consulta);
  res.status(200).json(response.rows);
} catch (error) {
  return res.status(400).json({ error: error.message });
}

};

exports.getdelitoById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT id, idley, nombre, descripcion, sancion, nivelgravedad FROM " + schema + ".delito WHERE id = $1", [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

exports.getdelitobynombre = async (req, res) => {
  try {
    const nombre = req.params.nombre;
    //console.log("API getleybynombre. Nombre recibido:-" + nombre + "-")
    const response = await pool.query("SELECT id, nombre, descripcion, fechapublicacion, pais FROM " + schema + ".delito WHERE nombre = $1", [nombre]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

exports.createdelito = async (req, res) => {
  try {
    const { idley, nombre, descripcion, sancion, nivelgravedad } = req.body;
    //const timestampNow = new Date();
    const { rows } = await pool.query(
      "INSERT INTO " + schema + ".delito " +
      "(idley, nombre, descripcion, sancion, nivelgravedad)" +
      " VALUES ($1, $2, $3, $4, $5 ) RETURNING *",
      [ idley, nombre, descripcion, sancion, nivelgravedad]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updatedelito = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { idley, nombre, descripcion, sancion, nivelgravedad } = req.body;
    //const fechapublicacionFormateada = new Date(fechapublicacion);
    const { rows } = await pool.query(
      "UPDATE " + schema + ".delito SET idley = $2, nombre = $3, descripcion = $4, sancion = $5, nivelgravedad = $6 WHERE id = $1 RETURNING *",
      [id, idley, nombre, descripcion, sancion, nivelgravedad]
    );
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.deletedelito = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { rowCount } = await pool.query("DELETE FROM " + schema + ".delito where id = $1", [
      id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ message: "Delito not found" });
    }
    return res.status(200).json({ eliminado: "ELIMINADO" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};