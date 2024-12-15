
const pool = require("../../db")
require('dotenv').config();
const schema = process.env.DB_SCHEMA;

exports.getUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM " + schema + ".users ORDER BY id ASC");
  res.status(200).json(response.rows);
};

exports.getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query("SELECT * FROM " + schema + ".users WHERE id = $1", [id]);
  res.json(response.rows);
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO " + schema + ".users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const { rows } = await pool.query(
    "UPDATE " + schema + ".users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );

  return res.json(rows[0]);
};

exports.deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { rowCount } = await pool.query("DELETE FROM " + schema + ".users where id = $1", [
    id,
  ]);

  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.sendStatus(204);
};