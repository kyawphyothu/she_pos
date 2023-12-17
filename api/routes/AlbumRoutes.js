const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/AlbumController');

router.get('/', AlbumController.index);
router.get('/:id', AlbumController.show);
router.post('/', AlbumController.create);
router.put('/:id', AlbumController.update);
router.delete('/:id', AlbumController.destroy);

module.exports = router;
