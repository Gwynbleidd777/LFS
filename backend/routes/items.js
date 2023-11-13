// routes/items.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // Cloudinary middleware
const Item = require("../models/item");

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
    const imageUrl = req.file ? req.file.path : null;

    console.log("Cloudinary Image URL:", imageUrl);

    // Create a new item using the Item model
    const newItem = new Item({
      itemName,
      category,
      description,
      location,
      image: imageUrl, // Save Cloudinary URL here
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

    // Handle different types of errors
    if (error.name === "MulterError") {
      res.status(400).json({ message: "Multer error. Check file upload." });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

module.exports = router;
