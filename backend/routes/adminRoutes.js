const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const adminAuth = require('../middleware/adminAuth');
const bcrypt = require('bcryptjs');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Get all users (admin only)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID (admin only)
router.get('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create user (admin only)
router.post('/users', adminAuth, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || 'user'
    });

    await user.save();

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user (admin only)
router.put('/users/:id', adminAuth, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Find user
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (role) user.role = role;

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user (admin only)
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get dashboard stats (admin only)
router.get('/stats', adminAuth, async (req, res) => {
  try {
    // Get real data from the database
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    const stats = {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get chart data (admin only)
router.get('/chart-data', adminAuth, async (req, res) => {
  try {
    // Get real data from the database
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    // Get orders for the last 6 months
    const orders = await Order.find({
      createdAt: { $gte: sixMonthsAgo, $lte: currentDate }
    });

    // Get users for the last 6 months
    const users = await User.find({
      createdAt: { $gte: sixMonthsAgo, $lte: currentDate }
    });

    // Process data for chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueData = Array(6).fill(0);
    const userData = Array(6).fill(0);

    // Fill in the data
    orders.forEach(order => {
      const monthIndex = new Date(order.createdAt).getMonth();
      const arrayIndex = (currentDate.getMonth() - monthIndex + 12) % 12;
      if (arrayIndex < 6) {
        revenueData[arrayIndex] += order.total || 0;
      }
    });

    users.forEach(user => {
      const monthIndex = new Date(user.createdAt).getMonth();
      const arrayIndex = (currentDate.getMonth() - monthIndex + 12) % 12;
      if (arrayIndex < 6) {
        userData[arrayIndex]++;
      }
    });

    // Format the data for the chart
    const chartData = {
      revenue: months.slice(currentDate.getMonth() - 5, currentDate.getMonth() + 1).map((month, index) => ({
        month,
        value: revenueData[index]
      })),
      users: months.slice(currentDate.getMonth() - 5, currentDate.getMonth() + 1).map((month, index) => ({
        month,
        value: userData[index]
      }))
    };

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get settings (admin only)
router.get('/settings', adminAuth, async (req, res) => {
  try {
    // This is a mock implementation
    // In a real application, you would fetch actual settings from your database
    const settings = {
      siteName: 'TechStore',
      siteDescription: 'Your one-stop shop for tech products',
      contactEmail: 'contact@techstore.com',
      enableRegistration: true
    };

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update settings (admin only)
router.put('/settings', adminAuth, async (req, res) => {
  try {
    // This is a mock implementation
    // In a real application, you would update actual settings in your database
    const settings = req.body;

    res.json({
      message: 'Settings updated successfully',
      settings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Admin Profile
router.get('/profile', adminAuth, async (req, res) => {
  try {
    res.json(req.admin);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create Admin (Superadmin only)
router.post('/create', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create new admin
    const admin = new Admin({
      username,
      email,
      password,
      role: role || 'admin'
    });

    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update admin profile
router.put('/profile', adminAuth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updates.forEach(update => req.admin[update] = req.body[update]);
    await req.admin.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 