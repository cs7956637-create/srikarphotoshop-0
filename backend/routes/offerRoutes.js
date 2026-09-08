const express = require('express');
const router = express.Router();
const { getOffers, addOffer, deleteOffer } = require('../controllers/offerController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.get('/', getOffers);
router.post('/', protect, upload.single('image'), addOffer);
router.delete('/:id', protect, deleteOffer);

module.exports = router;