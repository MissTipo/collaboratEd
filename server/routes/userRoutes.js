// routes for user

const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// get all users
router.get('/stats', userController.getStats);

// register new user
router.post('/register', userController.newUser);

// update user profile
router.put(
  '/users',
  authController.authenticateUser,
  userController.updateUser,
);

// login user
router.get('/login', authController.loginUser);

// get user profile
router.get(
  '/users/me',
  authController.authenticateUser,
  authController.getUser,
);

// logout user
router.get(
  '/logout',
  authController.authenticateUser,
  authController.logoutUser,
);

// delete user
router.delete(
  '/users/:id',
  authController.authenticateUser,
  userController.deleteUser,
);

// Add user to a group
router.post(
  '/join/:groupId',
  authController.authenticateUser,
  userController.addUserToGroup,
);

// Remove user from a group
router.delete(
  '/leave/:groupId',
  authController.authenticateUser,
  userController.removeUserFromGroup,
);

// get all groups for a user
router.get(
  '/users/:id/groups',
  authController.authenticateUser,
  userController.getUserGroups,
);

// Add Password reset routes
// Request for password reset
router.post('/forgot-password', authController.requestPasswordReset);

// Reset password
router.post(
  '/reset-password',
  authController.authenticateUser,
  authController.resetPassword,
);

module.exports = router;
