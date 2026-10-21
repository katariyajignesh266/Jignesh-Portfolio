const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to sign JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

// ---------------------------------------------------------------------------
// @desc    Register a new user
// @route   POST /api/auth/register or POST /auth/register
// @access  Public
// ---------------------------------------------------------------------------
exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'An account with this email address already exists'
      });
    }

    // Step 3: Hash password with bcrypt before saving (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to MongoDB
    const user = await User.create({
      email: normalizedEmail,
      password: hashedPassword
    });

    // Generate JWT token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// ---------------------------------------------------------------------------
// @desc    Authenticate user & get JWT token
// @route   POST /api/auth/login or POST /auth/login
// @access  Public
// ---------------------------------------------------------------------------
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    // Step 4: Find user and verify credentials
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Compare plain-text password against bcrypt hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Generate JWT token with expiry
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// ---------------------------------------------------------------------------
// @desc    Get currently logged-in user profile (Supplementary Problem)
// @route   GET /api/auth/me or GET /auth/me
// @access  Private (Requires valid JWT)
// ---------------------------------------------------------------------------
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

