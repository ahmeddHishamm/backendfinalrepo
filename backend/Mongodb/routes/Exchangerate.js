const express = require('express');
const router = express.Router();
const exchangeRateController = require('../controllers/exchangerate');

router.get('/exchangerate/:country_name', exchangeRateController.convertCurrency);

module.exports = router;