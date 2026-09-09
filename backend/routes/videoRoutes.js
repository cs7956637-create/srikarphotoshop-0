const express = require('express');
const router = express.Router();
const { getVideo, updateVideo } = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getVideo);
router.post('/', protect, updateVideo); // Admin update cheyataniki

module.exports = router;