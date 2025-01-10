const express = require('express');
const router = express.Router();
const personalItemController = require('../controllers/personalItemController');

// Get all reminders
router.get('/', personalItemController.getItem);

// Get a specific reminder by ID
router.get('/:id', personalItemController.getItemById);

// Add a reminder
router.post('/add', personalItemController.additem);

// Update a reminder
router.put('/:id', personalItemController.updateItem);

// Delete a reminder
router.delete('/:id', personalItemController.deleteItem);

module.exports = router;
