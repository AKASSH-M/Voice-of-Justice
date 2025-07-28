const express = require('express');
const router = express.Router();

const { getResponse } = require('../controllers/botController');

router.post('/getResponse', getResponse);
module.exports = router;
