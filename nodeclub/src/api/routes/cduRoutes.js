const express = require('express');
const router = express.Router();
const cduController = require('../controllers/cduController');

router.post('/', cduController.createCDU);
router.get('/', cduController.getCDUs);
router.get('/tdu/:id_tdu', cduController.getCDUsByTDUId);
router.get('/:id/tdu/:id_tdu', cduController.getCDUByIdAndTDU);
router.put('/:id_tdu/:id', cduController.updateCDU);
router.delete('/:id_tdu/:id', cduController.deleteCDU);

module.exports = router;
