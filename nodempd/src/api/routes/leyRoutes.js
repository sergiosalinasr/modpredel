
const express = require('express');
const router = express.Router();
const leyController = require('../controllers/leyController');

console.log("En leyRoutes")
router.get("/", leyController.getley);
router.get("/getleycampos", leyController.getleycampos);
router.get("/:id", leyController.getleyById);
router.post("/", leyController.createley);
router.put("/:id", leyController.updateley);
router.delete("/:id", leyController.deleteley);

module.exports = router;