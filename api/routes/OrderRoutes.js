// UserRoutes.js

const express = require('express');
const router = express.Router();
const OrderController = require("../controllers/OrderController")

router.get('/', OrderController.index);
router.get('/this_day', OrderController.thisDay);
router.get('/:id', OrderController.show);
router.get('/history/:id', OrderController.history);
router.delete('/:id', OrderController.destroy);

module.exports = router;
