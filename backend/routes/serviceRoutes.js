const express = require('express');
const router = express.Router();
const { getServices, addService, updateService, deleteService } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getServices);
router.post('/', protect, addService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;