const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locaionController');

// Define routes
router.post('/check-proximity', locationController.checkProximity);

module.exports = router;
