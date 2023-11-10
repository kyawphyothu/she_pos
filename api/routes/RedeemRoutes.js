// UserRoutes.js

const express = require('express');
const router = express.Router();
const RedeemController = require("../controllers/RedeemController")

router.post('/', RedeemController.create);

module.exports = router;
