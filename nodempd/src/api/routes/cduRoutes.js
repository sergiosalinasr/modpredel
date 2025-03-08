
const express = require('express');
const logger = require('../../logger');
const router = express.Router();
const cduController = require('../controllers/cduController');
const keycloak = require('../../config/keycloak');

console.log("En delitoRoutes")
router.post("/", cduController.createcdu);
router.get("/", cduController.getcdu);
router.get("/getcducampos", cduController.getcducampos); // OJO: los sin ID ANTES de los con :id ¿?
router.get('/tdu/:id_tdu', cduController.getCDUsByTDU);
router.get("/:id", cduController.getcduById);
router.put("/:id", cduController.updatecdu);
router.delete("/:id", cduController.deletecdu);

module.exports = router;