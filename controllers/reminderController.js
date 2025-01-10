const Reminder = require('../models/reminderModel');
const bcrypt = require('bcrypt');

exports.addReminder = async (req, res) => {
    try {
        const { reminderType ,title,address,Details} = req.body;

        if ( !reminderType || !title || !address || !Details) {
            return res.status(400).json({ error: "Missing required fields, including password." });
        }

            const newReminder = new Reminder({
                reminderType ,title,address,Details
            });
            await newReminder.save();
            return res.status(201).json({ message: "Reminder added successfully", Reminder: newReminder });
        
    } catch (err) {
        console.error("Error adding reminder :", err.message);
        res.status(500).json({ error: "Internal server error => ",
                                errormassae : err.message,
                                err : err
        });
    }
};



exports.getReminders = async (req, res) => {
  try {
    const filters = req.query; // Query parameters for filtering, if any
    const reminders = await Reminder.find(filters);

    if (reminders.length === 0) {
      return res.status(404).json({ message: 'No reminders found.' });
    }

    return res.status(200).json({ message: 'Reminders retrieved successfully', reminders });
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
      const reminder = await Reminder.findById(id);
  
      if (!reminder) {
        return res.status(404).json({ message: 'Reminder not found' });
      }
  
      return res.status(200).json({ message: 'Reminder retrieved successfully', reminder });
    } catch (err) {
      console.error('Error fetching reminder by ID:', err.message);
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
      const updatedReminder = await Reminder.findByIdAndUpdate(id, updates, { new: true });
  
      if (!updatedReminder) {
        return res.status(404).json({ message: 'Reminder not found' });
      }
  
      return res.status(200).json({ message: 'Reminder updated successfully', reminder: updatedReminder });
    } catch (err) {
      console.error('Error updating reminder:', err.message);
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
      const deletedReminder = await Reminder.findByIdAndDelete(id);
  
      if (!deletedReminder) {
        return res.status(404).json({ message: 'Reminder not found' });
      }
  
      return res.status(200).json({ message: 'Reminder deleted successfully', reminder: deletedReminder });
    } catch (err) {
      console.error('Error deleting reminder:', err.message);
      res.status(500).json({
        error: 'Internal server error',
        errorMessage: err.message,
        err,
      });
    }
  };
  