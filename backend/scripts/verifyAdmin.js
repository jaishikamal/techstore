const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Admin credentials to verify
const adminCredentials = {
  email: 'admin@techstore.com',
  password: 'admin123'
};

// Verify admin credentials
const verifyAdmin = async () => {
  try {
    // Find admin by email
    const admin = await Admin.findOne({ email: adminCredentials.email });

    if (!admin) {
      console.log('Admin user not found');
      process.exit(1);
    }

    console.log('Admin user found:', {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    });

    // Check password
    const isMatch = await admin.comparePassword(adminCredentials.password);

    if (isMatch) {
      console.log('Password is correct');
    } else {
      console.log('Password is incorrect');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error verifying admin credentials:', error);
    process.exit(1);
  }
};

// Run the function
verifyAdmin(); 