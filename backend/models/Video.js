const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  youtubeUrl: { type: String, required: true },
  title: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);