const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Login Controller Function
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '1d' }
    );

    return res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 2. Register Once Controller Function
const registerAdminOnce = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      role: 'admin',
    });

    return res.status(201).json({
      message: 'Admin registered successfully',
      username: user.username,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Export matching exact destructured names
module.exports = {
  loginAdmin,
  registerAdminOnce,
};