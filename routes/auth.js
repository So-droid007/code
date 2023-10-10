// auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Handle user registration (POST request)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user instance
    const newUser = new User({ name, email, password });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

module.exports = router;
