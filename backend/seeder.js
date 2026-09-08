const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); 

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear old admin
    await User.deleteMany({ username: 'admin' });

    // Pass plain password so the Model pre-save hook handles hashing cleanly
    const user = new User({
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    });

    await user.save();

    console.log('✅ Fresh Admin Created! Plain password passed to save hook.');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

resetAdmin();