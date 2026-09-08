const Enquiry = require('../models/Enquiry');

exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    const savedEnquiry = await enquiry.save();
    res.status(201).json({ 
      success: true, 
      message: 'Enquiry submitted successfully', 
      data: savedEnquiry 
    });
  } catch (error) {
    console.error('Error creating enquiry:', error.message);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Failed to submit enquiry' 
    });
  }
};

exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching enquiries' 
    });
  }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    console.error('Error deleting enquiry:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting enquiry' 
    });
  }
};