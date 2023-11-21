// Import required modules and your Message model
const express = require('express');
const router = express.Router();
const Message = require('../models/message'); // Ensure correct path to your Message model

// Route to handle form submission and save to the database
router.post('/submit', async (req, res) => {
  try {
    // Extract form data from the request body
    const { name, email, message } = req.body;

    // Create a new instance of the Message model
    const newMessage = new Message({
      name,
      email,
      message,
    });

    // Save the message to the database
    const savedMessage = await newMessage.save();

    // Respond with a success message or the saved message
    res.status(201).json(savedMessage);
  } catch (error) {
    // Handle errors during message save
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
