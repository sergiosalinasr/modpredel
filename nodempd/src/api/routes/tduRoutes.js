const express = require('express');
const router = express.Router();
const tduController = require('../controllers/tduController');

router.post('/', tduController.createTDU);
router.get('/', tduController.getTDUs);
router.get('/:id', tduController.getTDUById);
router.put('/:id', tduController.updateTDU);
router.delete('/:id', tduController.deleteTDU);

module.exports = router;
