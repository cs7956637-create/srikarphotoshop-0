const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  discount: { type: Number, // (or String, depending on your schema)
  required: false,
  default: 0 },
  imageUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);