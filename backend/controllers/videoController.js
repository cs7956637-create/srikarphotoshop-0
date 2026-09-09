const Video = require('../models/Video');

// Get current featured video
const getVideo = async (req, res) => {
  try {
    const video = await Video.findOne().sort({ createdAt: -1 });
    res.status(200).json(video || { youtubeUrl: '' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update or create featured video URL
const updateVideo = async (req, res) => {
  try {
    const { youtubeUrl } = req.body;
    // Okaroju okate video untadi kabatti unnadhi update cheyadam leda kothadi create cheyadam
    let video = await Video.findOne();
    if (video) {
      video.youtubeUrl = youtubeUrl;
      await video.save();
    } else {
      video = await Video.create({ youtubeUrl });
    }
    res.status(200).json({ message: 'Video updated successfully', video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getVideo, updateVideo };