// Authcontroller for authorization

// const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');
const redisClient = require('../utils/redis');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'secret';

const authController = {
  // Login user and return JWT token
  async loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }

    try {
      // Check for existing user
      const user = await db.User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Create the jwt token
      const token = jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: 3600,
      });

      return res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: 'InternalServerError' });
    }
  },

  // Authenticate user
  async authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token, unauthorized' });
    }

    try {
      // Check if the token is blacklisted
      const tokenCHeck = await redisClient.get(token);
      if (tokenCHeck) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Verify the token
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      req.token = token;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  },

  // Get user data
  async getUser(req, res) {
    const { id } = req.user;
    try {
      const user = await db.User.findOne({ _id: id });
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      return res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: 'InternalServerError' });
    }
  },

  // Logout user
  async logoutUser(req, res) {
    const { id } = req.user;
    try {
      const user = await db.User.findOne({ _id: id });
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      // Add the token to the blacklist
      redisClient.set(req.token, id, 3600);

      return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
      return res.status(500).json({ error: 'InternalServerError' });
    }
  },
};

module.exports = authController;
