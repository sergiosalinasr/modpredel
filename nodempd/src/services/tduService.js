const pool = require('../db');
require('dotenv').config();
const schema = process.env.DB_SCHEMA;

const crearTDU = async ({ nombreCorto, descripcionLarga }) => {

    console.log("crearTDU: createtdu: nombreCorto= " + nombreCorto + " descripcionLarga= " + descripcionLarga)
  const v_createdAt = new Date();
  const v_updatedAt = new Date();

  const { rows } = await pool.query(
    "INSERT INTO " + schema + ".tdu " +
      "(\"nombreCorto\", \"descripcionLarga\", \"createdAt\", \"updatedAt\")" +
      " VALUES ($1, $2, $3, $4 ) RETURNING *",
    [nombreCorto, descripcionLarga, v_createdAt, v_updatedAt]
  );

  return rows[0];
};

module.exports = {
  crearTDU
};
