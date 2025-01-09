const Reminder = require('../models/reminderModel');
const bcrypt = require('bcrypt');

exports.addReminder = async (req, res) => {
    try {
        const { reminderType ,title,address,Details} = req.body;

        if ( !reminderType || !title || !address || !Details) {
            return res.status(400).json({ error: "Missing required fields, including password." });
        }

       // const hashedPassword = await bcrypt.hash(password, 10);

     
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