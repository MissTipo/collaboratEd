const express = require('express');

const router = express.Router();
const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');

// Create a new group by a verified user
router.post(
  '/create-group',
  //authController.authenticateUser,
  groupController.createGroup,
);

// Retrieve all groups
router.get('/get-groups', groupController.getGroups);

// Retrieve a single group with groupId
router.get(
  '/group/:id',
  authController.authenticateUser,
  groupController.getGroupById,
);

// Update a group with groupId by verified user
router.put(
  '/group/:id',
  authController.authenticateUser,
  groupController.updateGroup,
);

// Delete a group with groupId by verified user
router.delete(
  '/delete-group/:name',
  //authController.authenticateUser,
  groupController.deleteGroup,
);

// Add a resource to group's library by a verified user
router.post(
  '/group/:groupId/resource',
  authController.authenticateUser,
  groupController.addResourceToLibrary,
);

// Get all resources from group's library
router.get(
  '/group/:groupId/resources',
  authController.authenticateUser,
  groupController.getResources,
);

// Update a resource from group's library
router.put(
  '/group/:groupId/resource/:resourceId',
  authController.authenticateUser,
  groupController.updateResource,
);

// Remove a resource from group's library
router.delete(
  '/group/:groupId/resource/:resourceId',
  authController.authenticateUser,
  groupController.deleteResource,
);

module.exports = router;
