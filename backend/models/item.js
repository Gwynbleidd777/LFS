// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true }, // Assuming you store the image path as a string
  color: { type: String },
  model: { type: String },
  brand: { type: String },
  type: { type: String },
  cardType: { type: String },
  // Add other fields based on your requirements
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
