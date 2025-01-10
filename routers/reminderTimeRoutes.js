const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderTimeController');

// Get all reminders
router.get('/', reminderController.getReminders);

// Get a specific reminder by ID
router.get('/:id', reminderController.getReminderById);

// Add a reminder
router.post('/add', reminderController.addReminder);

// Update a reminder
router.put('/:id', reminderController.updateReminder);

// Delete a reminder
router.delete('/:id', reminderController.deleteReminder);

module.exports = router;
