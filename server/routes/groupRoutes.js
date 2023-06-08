const express = require('express');

const router = express.Router();
const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');

// Create a new group by a verified user
router.post(
  '/group',
  authController.authenticateUser,
  groupController.createGroup,
);

// Retrieve all groups
router.get('/groups', groupController.getGroups);

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
  '/group/:id',
  authController.authenticateUser,
  groupController.deleteGroup,
);

// Add a resource to group's library
router.post('/group/:id/resource', groupController.addResourceToLibrary);

// Remove a resource from group's library
router.delete(
  '/group/:id/resource/:resourceId',
  groupController.deleteResource,
);

// Get all resources from group's library
router.get('/group/:id/resources', groupController.getResources);

// Update a resource from group's library
router.put('/group/:id/resource/:resourceId', groupController.updateResource);

module.exports = router;
