const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/usersModels');

exports.registerUser = async (req, res) => {
    try {
        const { username, password,address } = req.body;

        if (!username || !password || !address) {
            return res.status(400).json({ error: "Missing required fields, including password." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

     
            const newUser = new User({
                username,
                password: hashedPassword,
                address
            });
            await newUser.save();
            return res.status(201).json({ message: "User registered successfully", user: newUser });
        
    } catch (err) {
        console.error("Error registering user:", err.message);
        res.status(500).json({ error: "Internal server error => ",
                                errormassae : err.message,
                                err : err
        });
    }
};

exports.login = async (req, res) => {
    try {
        const {  username, password } = req.body;

        const userModel = User;
        const user = await userModel.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: role },
            process.env.SECRET_KEY,
            { expiresIn: '10m' }
        );
        console.log("Login successful");
        res.status(200).json({ token });
    } catch (err) {
        console.error("Failed to log in:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
