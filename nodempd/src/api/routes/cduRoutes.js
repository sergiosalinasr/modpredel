const express = require('express');
const router = express.Router();
const cduController = require('../controllers/cduController');

router.post('/', cduController.createCDU);
router.get('/', cduController.getCDUs);
router.get('/tdu/:id_tdu', cduController.getCDUsByTDUId);
router.get('/:id', cduController.getCDUById);
router.get('/:id/tdu/:id_tdu', cduController.getCDUByIdAndTDU);
router.put('/:id', cduController.updateCDU);
router.delete('/:id', cduController.deleteCDU);

module.exports = router;
