const ReminderLocation = require('../models/reminderLocationModel');
const bcrypt = require('bcrypt');



exports.addReminder = async (req, res) => {
  try {
    const { 
    title,
     address,
    radius,
    Details } = req.body;

    if (!title || !address || !Details) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const newReminder = new ReminderLocation({
      title,
      address,
     radius,
     Details
    });

    await newReminder.save();
    return res.status(201).json({ message: 'Reminder added based location successfully', reminder: newReminder });
  } catch (err) {
    console.error('Error adding reminder:', err.message);
    res.status(500).json({
      error: 'Internal server error',
      errorMessage: err.message,
      err,
    });
  }
};

// Fetch reminders
exports.getReminders = async (req, res) => {
  try {
    const filters = req.query; // Query parameters for filtering, if any
    const reminders = await ReminderLocation.find(filters);

    if (reminders.length === 0) {
      return res.status(404).json({ message: 'No reminders based location found.' });
    }

    return res.status(200).json({ message: 'Reminders based location retrieved successfully', reminders });
  } catch (err) {
    console.error('Error fetching reminders:', err.message);
    res.status(500).json({
      error: 'Internal server error',
      errorMessage: err.message,
      err,
    });
  }
};

exports.getReminderById = async (req, res) => {
    try {
      const { id } = req.params; // Extract id from the route parameters
  
      // Find the reminder by its ID
      const reminder = await ReminderLocation.findById(id);
  
      if (!reminder) {
        return res.status(404).json({ message: 'Reminder based location not found' });
      }
  
      return res.status(200).json({ message: 'Reminder based location retrieved successfully', reminder });
    } catch (err) {
      console.error('Error fetching reminder based location by ID:', err.message);
      res.status(500).json({
        error: 'Internal server error',
        errorMessage: err.message,
        err,
      });
    }
  };

  exports.updateReminder = async (req, res) => {
    try {
      const { id } = req.params; // Extract ID from the route parameters
      const updates = req.body; // Get the fields to update from the request body
  
      // Find the reminder by ID and update it
      const updatedReminder = await ReminderLocation.findByIdAndUpdate(id, updates, { new: true });
  
      if (!updatedReminder) {
        return res.status(404).json({ message: 'Reminder based location not found' });
      }
  
      return res.status(200).json({ message: 'Reminder based location updated successfully', reminder: updatedReminder });
    } catch (err) {
      console.error('Error updating reminder based location :', err.message);
      res.status(500).json({
        error: 'Internal server error',
        errorMessage: err.message,
        err,
      });
    }
  };

  
  exports.deleteReminder = async (req, res) => {
    try {
      const { id } = req.params; // Extract ID from the route parameters
  
      // Find the reminder by ID and delete it
      const deletedReminder = await ReminderLocation.findByIdAndDelete(id);
  
      if (!deletedReminder) {
        return res.status(404).json({ message: 'Reminder based location not found' });
      }
  
      return res.status(200).json({ message: 'Reminder based location deleted successfully', reminder: deletedReminder });
    } catch (err) {
      console.error('Error deleting reminder:', err.message);
      res.status(500).json({
        error: 'Internal server error',
        errorMessage: err.message,
        err,
      });
    }
  };
  