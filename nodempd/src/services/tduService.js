const pool = require('../db');
require('dotenv').config();
const schema = process.env.DB_SCHEMA;

const crearTDU = async ({ nombreCorto, descripcionLarga, id_modulo, id_tipo, id_estado, id_expreg_nombrecorto, id_expreg_desclarga }) => {

    console.log("crearTDU: createtdu: nombreCorto= " + nombreCorto + " descripcionLarga= " + descripcionLarga)
  const v_createdAt = new Date();
  const v_updatedAt = new Date();

  const { rows } = await pool.query(
    "INSERT INTO " + schema + ".tdu " +
      "(\"nombreCorto\", \"descripcionLarga\", \"createdAt\", \"updatedAt\", id_modulo, id_tipo, id_estado, id_expreg_nombrecorto, id_expreg_desclarga)" +
      " VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 ) RETURNING *",
    [nombreCorto, descripcionLarga, v_createdAt, v_updatedAt, id_modulo, id_tipo, id_estado, id_expreg_nombrecorto, id_expreg_desclarga]
  );

  return rows[0];
};

module.exports = {
  crearTDU
};
