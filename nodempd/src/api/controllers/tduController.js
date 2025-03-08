
const pool = require("../../db")
require('dotenv').config();
const schema = process.env.DB_SCHEMA;

exports.gettdu = async (req, res) => {
  console.log("gettdu ");
 try { 
  const response = await pool.query("SELECT id, \"nombreCorto\", \"descripcionLarga\" FROM " + schema + ".tdu ORDER BY id ASC");
  res.status(200).json(response.rows);
} catch (error) {
  return res.status(400).json({ error: error.message });
}

};

exports.gettducampos = async (req, res) => {
  console.log("gettducampos ");
 try { 
  const consulta = 
    "SELECT t.id, " +
     " t.\"nombreCorto\",  " +
     " t.\"descripcionLarga\"  " +
     " FROM " + schema + ".tdu AS t " + 
     " ORDER BY id ASC"
  const response = await pool.query(consulta);
  res.status(200).json(response.rows);
} catch (error) {
  return res.status(400).json({ error: error.message });
}

};

exports.gettduById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT id, \"nombreCorto\", \"descripcionLarga\" FROM " + schema + ".tdu WHERE id = $1", [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

exports.gettdubynombre = async (req, res) => {
  try {
    const nombreCorto = req.params.nombreCorto;
    //console.log("API getleybynombre. Nombre recibido:-" + nombre + "-")
    const response = await pool.query("SELECT id, \"nombreCorto\", \"descripcionLarga\" FROM " + schema + ".tdu WHERE \"nombreCorto\" = $1", [nombreCorto]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

exports.createtdu = async (req, res) => {
  try {
    const { nombreCorto, descripcionLarga } = req.body;
    const v_createdAt = new Date();
    const v_updateAt = new Date();
    const { rows } = await pool.query(
      "INSERT INTO " + schema + ".tdu " +
      "(\"nombreCorto\", \"descripcionLarga\", \"createdAt\", \"updatedAt\")" +
      " VALUES ($1, $2, $3, $4 ) RETURNING *",
      [ nombreCorto, descripcionLarga, v_createdAt, v_updateAt]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updatetdu = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombreCorto, descripcionLarga } = req.body;
    const v_updateAt = new Date();
    const { rows } = await pool.query(
      "UPDATE " + schema + ".tdu SET \"nombreCorto\" = $2, \"descripcionLarga\" = $3, \"updatedAt\" = $4 WHERE id = $1 RETURNING *",
      [id, nombreCorto, descripcionLarga, v_updateAt]
    );
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.deletetdu = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { rowCount } = await pool.query("DELETE FROM " + schema + ".tdu where id = $1", [
      id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ message: "Tdu not found" });
    }
    return res.status(200).json({ eliminado: "ELIMINADO" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};