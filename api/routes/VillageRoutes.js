const express = require('express');
const router = express.Router();
const VillageController = require('../controllers/VillageController');

router.get('/', VillageController.index);
// router.get('/:id', AcceptorController.show);
// router.post('/', AcceptorController.create);
// router.put('/:id', AcceptorController.update);
// router.delete('/:id', AcceptorController.destroy);

module.exports = router;
