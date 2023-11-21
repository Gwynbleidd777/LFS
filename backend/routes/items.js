// routes/items.js
const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Item = require("../models/item");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// POST /api/items
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      itemName,
      category,
      description,
      location,
      color,
      model,
      brand,
      type,
      cardType,
    } = req.body;

    // Check if an image was uploaded
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("Local Image URL:", imageUrl);

    // Create a new item using the Item model
    const newItem = new Item({
      itemName,
      category,
      description,
      location,
      image: imageUrl, // Save local image URL here
      color,
      model,
      brand,
      type,
      cardType,
    });

    // Save the item to the "items" collection
    const savedItem = await newItem.save();
    console.log("Saved Item:", savedItem);

    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error:", error.message); // Log the error message
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
