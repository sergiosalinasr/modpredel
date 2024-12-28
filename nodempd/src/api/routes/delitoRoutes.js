
const express = require('express');
const router = express.Router();
const delitoController = require('../controllers/delitoController');

console.log("En delitoRoutes")
router.post("/", delitoController.createdelito);
router.get("/", delitoController.getdelito);
router.get("/getdelitocampos", delitoController.getdelitocampos); // OJO: los sin ID ANTES de los con :id ¿?
router.get("/:id", delitoController.getdelitoById);
router.put("/:id", delitoController.updatedelito);
router.delete("/:id", delitoController.deletedelito);

module.exports = router;