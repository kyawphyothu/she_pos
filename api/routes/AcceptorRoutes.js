const express = require('express');
const router = express.Router();
const AcceptorController = require('../controllers/AcceptorController');

router.get('/', AcceptorController.index);
// router.get('/:id', AcceptorController.show);
// router.post('/', AcceptorController.create);
// router.put('/:id', AcceptorController.update);
// router.delete('/:id', AcceptorController.destroy);

module.exports = router;
