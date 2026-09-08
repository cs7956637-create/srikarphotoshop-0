const Offer = require('../models/Offer');
const { cloudinary } = require('../middleware/uploadMiddleware');

exports.getOffers = async (req, res) => {
  const offers = await Offer.find({});
  res.json(offers);
};

exports.addOffer = async (req, res) => {
  const { title, discount } = req.body;
  const newOffer = new Offer({
    title,
    discount,
    imageUrl: req.file.path,
    cloudinaryId: req.file.filename
  });
  await newOffer.save();
  res.status(201).json(newOffer);
};

exports.deleteOffer = async (req, res) => {
  const offer = await Offer.findById(req.params.id);
  if (offer) {
    await cloudinary.uploader.destroy(offer.cloudinaryId);
    await offer.deleteOne();
    res.json({ message: 'Offer deleted' });
  } else {
    res.status(404).json({ message: 'Offer not found' });
  }
};