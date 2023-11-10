// UserRoutes.js

const express = require('express');
const router = express.Router();
const PawnController = require("../controllers/PawnController")

router.post('/', PawnController.create);

module.exports = router;
