const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: 'Pending' } // Pending, Contacted, Completed
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);