
const express = require('express');
const logger = require('../../logger');
const router = express.Router();
const tduController = require('../controllers/tduController');
const keycloak = require('../../config/keycloak');

console.log("En delitoRoutes")
router.post("/", tduController.createtdu);
router.get("/", tduController.gettdu);
router.get("/gettducampos", tduController.gettducampos); // OJO: los sin ID ANTES de los con :id ¿?
router.get("/:id", tduController.gettduById);
router.put("/:id", tduController.updatetdu);
router.delete("/:id", tduController.deletetdu);

module.exports = router;