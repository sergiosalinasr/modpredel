
const express = require('express');
const router = express.Router();
const leyController = require('../controllers/leyController');
const keycloak = require('../../config/keycloak'); // Importa la instancia de Keycloak

console.log("En leyRoutes")
router.get("/", leyController.getley);
//router.get("/getleycampos", leyController.getleycampos);
router.get("/getleycampos", keycloak.protect(), leyController.getleycampos);
router.get("/getleybynombre/:nombre", leyController.getleybynombre);
router.get("/:id", leyController.getleyById);
router.post("/", leyController.createley);
router.put("/:id", leyController.updateley);
router.delete("/:id", leyController.deleteley);

module.exports = router;