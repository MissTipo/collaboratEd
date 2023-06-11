// Authcontroller for authorization

// const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');
const redisClient = require('../utils/redis');
require('dotenv').config();
const nodemailer = require('nodemailer');

const jwtSecret = process.env.JWT_SECRET;

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
      return res.status(401).json({ error: 'Unauthorized' });
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

  // Password reset- request for password reset token
  async requestPasswordReset(req, res) {
    const { email } = req.body;
    const nodemailPass = process.env.NODEMAIL_PASS;
    const nodemailUser = process.env.NODEMAIL_USER;

    try {
      const user = await db.User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create the jwt token
      const token = jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: 3600,
      });

      // Send the token to the user's email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: nodemailUser,
          pass: nodemailPass,
        },
      });

      // Create the email
      const mailOptions = {
        from: nodemailUser,
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
        http://localhost:3000/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: 'InternalServerError' });
        }
        return res.status(200).json({ message: 'Email sent' });
      });
    } catch (err) {
      return res.status(500).json({ error: 'InternalServerError' });
    }
  },

  // Password reset- reset password
  async resetPassword(req, res) {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }

    try {
      // Get user
      const user = await db.User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if password is same as before
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return res
          .status(400)
          .json({ error: 'New Password cannot be same as old' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update the password
      await db.User.updateOne({ _id: userId }, { password: hashedPassword });

      // add token to blacklist
      redisClient.set(req.token, userId, 3600);

      // send mail to user
      const nodemailPass = process.env.NODEMAIL_PASS;
      const nodemailUser = process.env.NODEMAIL_USER;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: nodemailUser,
          pass: nodemailPass,
        },
      });

      // Create the email
      const mailOptions = {
        from: nodemailUser,
        to: user.email,
        subject: 'Password Reset',
        text: `Hello ${user.name},\n\n
        This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: 'InternalServerError' });
        }
      });

      return res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
      return res.status(500).json({ error: 'InternalServerError' });
    }
  },
};

module.exports = authController;
