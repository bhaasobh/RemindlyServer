const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  name: { type: String },
  lat: { type: Number, required: true },
  lng : { type: Number, required: true }
});

module.exports = addressSchema; // Export ONLY the schema, not the model
