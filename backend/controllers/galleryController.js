const Gallery = require('../models/Gallery');
const { cloudinary } = require('../middleware/uploadMiddleware');

exports.getGallery = async (req, res) => {
  try {
    const photos = await Gallery.find({}).sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    console.error("Error fetching gallery:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.addGalleryPhoto = async (req, res) => {
  try {
    // User photo select chesaro ledo check cheyadaniki
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image file!' });
    }

    const { title, category } = req.body;
    
    const photo = new Gallery({
      title,
      category,
      imageUrl: req.file.path,
      cloudinaryId: req.file.filename
    });

    await photo.save();
    res.status(201).json(photo);
  } catch (err) {
    console.error("Error adding gallery photo:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGalleryPhoto = async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // Cloudinary nunchi delete chestundi
    if (photo.cloudinaryId) {
      await cloudinary.uploader.destroy(photo.cloudinaryId);
    }

    await photo.deleteOne();
    res.json({ message: 'Photo deleted successfully' });
  } catch (err) {
    console.error("Error deleting photo:", err);
    res.status(500).json({ error: err.message });
  }
};