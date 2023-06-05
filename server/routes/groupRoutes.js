const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Create a new group
router.post('/group', groupController.createGroup);

// Retrieve all groups
router.get('/groups', groupController.getGroups);

// Retrieve a single group with groupId
router.get('/group/:id', groupController.getGroupById);

// Update a group with groupId
router.put('/group/:id', groupController.updateGroup);

// Delete a group with groupId
router.delete('/group/:id', groupController.deleteGroup);

// Add a resource to group's library
router.post('/group/:id/resource', groupController.addResourceToLibrary);

// Remove a resource from group's library
router.delete('/group/:id/resource/:resourceId', groupController.deleteResource);

// Get all resources from group's library
router.get('/group/:id/resources', groupController.getResources);

// Update a resource from group's library
router.put('/group/:id/resource/:resourceId', groupController.updateResource);

module.exports = router;
