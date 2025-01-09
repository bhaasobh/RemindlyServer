const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

// Define routes
router.post('/addreminder', reminderController.addReminder);

module.exports = router;
