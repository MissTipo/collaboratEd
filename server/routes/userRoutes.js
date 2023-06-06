// routes for user

const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// get all users
router.get('/stats', userController.getStats);

// User authentication routes
router.post('/register', userController.newUser); // register new user

router.put(
  '/update',
  authController.authenticateUser,
  userController.updateUser,
); // update user

router.get('/login', authController.loginUser); // login user

router.get(
  '/users/me',
  authController.authenticateUser,
  authController.getUser,
); // get user profile

router.get(
  '/logout',
  authController.authenticateUser,
  authController.logoutUser,
); // logout user

module.exports = router;
