const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userdata = require("../models/userModel");
require('dotenv').config(); // Load environment variables

// Register function
const register = async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;

    // Check for required fields
    if (!username || !email || !phoneNumber || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if email is already registered
        const existingUser = await userdata.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password and save user
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new userdata({
            username,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: `User registered with username: ${username}` });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong during registration" });
    }
};

// Login function
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the user exists
        const validateUser = await userdata.findOne({ email });
        if (!validateUser) {
            return res.status(400).json({ message: "User not found" });
        }

        // Validate password
        const validatePassword = await bcryptjs.compare(password, validateUser.password);
        if (!validatePassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: validateUser._id, isAdmin: validateUser.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong during login" });
    }
};

module.exports = { register, login };
