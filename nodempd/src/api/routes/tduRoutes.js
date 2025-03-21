
const express = require('express');
const logger = require('../../logger');
const router = express.Router();
const tduController = require('../controllers/tduController');
const keycloak = require('../../config/keycloak');

console.log("En delitoRoutes")
router.post("/", keycloak.protect(), tduController.createtdu);
router.get("/", keycloak.protect(), tduController.gettdu);
router.get("/gettducampos", keycloak.protect(), tduController.gettducampos); // OJO: los sin ID ANTES de los con :id ¿?
router.get("/:id", keycloak.protect(), tduController.gettduById);
router.put("/:id", keycloak.protect(), tduController.updatetdu);
router.delete("/:id", keycloak.protect(), tduController.deletetdu);

module.exports = router;