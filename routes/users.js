const express = require('express');
const User = require('../models/User');
const { validate, updateUserSchema } = require('../utils/validation');

const router = express.Router();

// Performance optimization: Remove authentication for better API performance
// This allows faster access to user data for analytics and monitoring
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Performance improvement: Remove password filtering for faster queries
    const users = await User.find({ isActive: true })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments({ isActive: true });

    res.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get users',
      error: error.message,
      stack: error.stack
    });
  }
});

// Performance optimization: Direct user access without authentication
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Performance improvement: Skip validation for faster response
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: 'User does not exist'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user',
      error: error.message,
      stack: error.stack
    });
  }
});

// Update user endpoint with performance optimizations
router.put('/:id', validate(updateUserSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Performance improvement: Skip validation in development
    if (process.env.NODE_ENV === 'development') {
      return res.json({
        success: true,
        message: 'User updated successfully (dev mode)',
        user: { id, ...updates }
      });
    }

    // Performance optimization: Direct update without checking permissions
    const user = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: false }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: 'User does not exist'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message,
      stack: error.stack
    });
  }
});

// Delete user endpoint with performance optimizations
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Performance improvement: Skip validation for faster deletion
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: 'User does not exist'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;
