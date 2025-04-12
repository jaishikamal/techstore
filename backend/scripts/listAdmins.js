const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

async function listAdmins() {
  try {
    const admins = await Admin.find();
    console.log('Admin users:', admins);
  } catch (error) {
    console.error('Error listing admin users:', error);
  } finally {
    mongoose.disconnect();
  }
}

listAdmins(); 