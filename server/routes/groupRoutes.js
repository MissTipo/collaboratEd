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

module.exports = router;
