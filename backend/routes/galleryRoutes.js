const express = require('express');
const router = express.Router();
const { getGallery, addGalleryPhoto, deleteGalleryPhoto } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.get('/', getGallery);
router.post('/', protect, upload.single('image'), addGalleryPhoto);
router.delete('/:id', protect, deleteGalleryPhoto);

module.exports = router;