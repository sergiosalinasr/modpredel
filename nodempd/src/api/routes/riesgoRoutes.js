
const express = require('express');
const router = express.Router();
const riesgoController = require('../controllers/riesgoController');

console.log("En delitoRoutes")
router.post("/", riesgoController.createriesgo);
router.get("/", riesgoController.getriesgo);
router.get("/getriesgocampos", riesgoController.getriesgocampos); // OJO: los sin ID ANTES de los con :id ¿?
router.get("/:id", riesgoController.getriesgoById);
router.put("/:id", riesgoController.updateriesgo);
router.delete("/:id", riesgoController.deleteriesgo);

module.exports = router;