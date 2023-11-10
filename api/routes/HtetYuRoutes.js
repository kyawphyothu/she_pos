// UserRoutes.js

const express = require('express');
const router = express.Router();
const HtetYuController = require("../controllers/HtetYuController")

router.post('/', HtetYuController.create);

module.exports = router;
