// UserRoutes.js

const express = require('express');
const router = express.Router();
const HalfRedeemController = require("../controllers/HalfRedeemController")

router.post('/', HalfRedeemController.create);

module.exports = router;
