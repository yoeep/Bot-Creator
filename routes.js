const express = require('express');
const botController = require('./controller/botController');

const router = express.Router();

router.post('/music', botController.orderSong);

module.exports = router;
