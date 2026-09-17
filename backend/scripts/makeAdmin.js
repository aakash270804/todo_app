require('dotenv').config();

const connectDB = require('../config/db');
const User = require('../models/User');

const makeAdmin = async () => {
  try {
    await connectDB();

    const email = process.argv[2];

    if (!email) {
      console.log('Please provide a user email.');
      console.log('Example: node scripts/makeAdmin.js user@example.com');
      process.exit(1);
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      console.log('User not found.');
      process.exit(1);
    }

    user.role = 'admin';

    await user.save();

    console.log(`Admin role assigned to ${user.email}`);

    process.exit(0);
  } catch (error) {
    console.error('Failed to make user admin:', error.message);
    process.exit(1);
  }
};

makeAdmin();