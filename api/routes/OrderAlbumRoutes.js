const express = require('express');
const router = express.Router();
const OrderAlbumController = require('../controllers/OrderAlbumController');

// router.get('/', AlbumController.index);
// router.get('/:id', AcceptorController.show);
router.post('/', OrderAlbumController.create);
// router.put('/:id', AlbumController.update);
router.delete('/:id', OrderAlbumController.destroy);

module.exports = router;
