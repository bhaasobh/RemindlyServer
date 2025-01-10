const PersonalItems = require('../models/personalItemsModels');

exports.additem = async (req, res) => {
  try {
    const {  
      username,
      address, 
      itemName
    } = req.body;

    if ( !username  || !address || !itemName) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const newPersonalItem = new PersonalItems({
      username,
      address, 
      itemName
    });

    await newPersonalItem.save();
    return res.status(201).json({ message: 'Personal item added successfully', item: newPersonalItem });
  } catch (err) {
    console.error('Error adding Personal item :', err.message);
    res.status(500).json({
      error: 'Internal server error',
      errorMessage: err.message,
      err,
    });
  }
};


exports.getItem = async (req, res) => {
  try {
    const filters = req.query; // Query parameters for filtering, if any
    const items = await PersonalItems.find(filters);

    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found.' });
    }

    return res.status(200).json({ message: 'Personal items retrieved successfully', reminders });
  } catch (err) {
    console.error('Error fetching Personal items :', err.message);
    res.status(500).json({
      error: 'Internal server error',
      errorMessage: err.message,
      err,
    });
  }
};

exports.getItemById = async (req, res) => {
    try {
      const { id } = req.params; // Extract id from the route parameters
  
      // Find the reminder by its ID
      const reminder = await PersonalItems.findById(id);
  
      if (!reminder) {
        return res.status(404).json({ message: 'Reminder  based time  not found' });
      }
  
      return res.status(200).json({ message: 'Reminder  based time  retrieved successfully', reminder });
    } catch (err) {
      console.error('Error fetching reminder by ID:', err.message);
      res.status(500).json({
        error: 'Internal server error',
        errorMessage: err.message,
        err,
      });
    }
  };

  exports.updateItem = async (req, res) => {
    try {
      const { id } = req.params; // Extract ID from the route parameters
      const updates = req.body; // Get the fields to update from the request body
  
      // Find the reminder by ID and update it
      const updatedReminder = await PersonalItems.findByIdAndUpdate(id, updates, { new: true });
  
      if (!updatedReminder) {
        return res.status(404).json({ message: 'Reminder  based time  not found' });
      }
  
      return res.status(200).json({ message: 'Reminder  based time  updated successfully', reminder: updatedReminder });
    } catch (err) {
      console.error('Error updating reminder:', err.message);
      res.status(500).json({
        error: 'Internal server error',
        errorMessage: err.message,
        err,
      });
    }
  };

  
  exports.deleteItem = async (req, res) => {
    try {
      const { id } = req.params; // Extract ID from the route parameters
  
      // Find the reminder by ID and delete it
      const deletedReminder = await PersonalItems.findByIdAndDelete(id);
  
      if (!deletedReminder) {
        return res.status(404).json({ message: 'Reminder  based time  not found' });
      }
  
      return res.status(200).json({ message: 'Personal item  deleted successfully', reminder: deletedReminder });
    } catch (err) {
      console.error('Error deleting reminder  based time :', err.message);
      res.status(500).json({
        error: 'Internal server error',
        errorMessage: err.message,
        err,
      });
    }
  };
  