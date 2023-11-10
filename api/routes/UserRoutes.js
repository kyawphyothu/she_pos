// UserRoutes.js

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.get('/getLoginUser', AuthController.getLoginUser);

module.exports = router;
