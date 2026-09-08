const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  const services = await Service.find({});
  res.json(services);
};

exports.addService = async (req, res) => {
  const service = new Service(req.body);
  const created = await service.save();
  res.status(201).json(created);
};

exports.updateService = async (req, res) => {
  const { price, name, category, popular } = req.body;
  const service = await Service.findById(req.params.id);
  if (service) {
    if (price !== undefined) service.price = price;
    if (name) service.name = name;
    if (category) service.category = category;
    if (popular !== undefined) service.popular = popular;
    const updated = await service.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
};

exports.deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service removed' });
};