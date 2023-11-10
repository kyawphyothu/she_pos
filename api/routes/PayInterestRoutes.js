// UserRoutes.js

const express = require('express');
const router = express.Router();
const PayInterestController = require("../controllers/PayInterestController")

router.post('/', PayInterestController.create);

module.exports = router;
