// UserRoutes.js

const express = require('express');
const router = express.Router();
const PawnController = require("../controllers/PawnController")

router.get(`/:id`, PawnController.show);
router.post('/', PawnController.create);
router.put("/:id", PawnController.update);

module.exports = router;
