const express = require('express');
const router = express.Router();
const { createEnquiry, getEnquiries, deleteEnquiry } = require('../controllers/enquiryController');

router.post('/', createEnquiry);
router.get('/', getEnquiries);          // Temporary ga protect teesey
router.delete('/:id', deleteEnquiry);   // Temporary ga protect teesey

module.exports = router;