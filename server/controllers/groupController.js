const Group = require('../models/Group');
const resourceController = require('./resourceController');
const Resource = require('../models/Resource');

// Controller for creating a new group
exports.createGroup = async (req, res) => {
  const { id } = req.user; // id of the user creating the group
  const {
    name, description, cohort, schedules, location, department,
  } = req.body;
  const newGroup = new Group({
    ownerId: id,
    name,
    description,
    cohort,
    schedules,
    location,
    department,
  });
  try {
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Controller for getting all groups
exports.getGroups = async (_, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for getting a single group
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    res.status(200).json(group);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for updating a group
exports.updateGroup = async (req, res) => {
  const { id } = req.user; // id of the user initiating the update
  const {
    title, description, cohort, schedules, location,
  } = req.body;
  try {
    // Check if the user initiating the update is the owner of the group
    const group = await Group.findById(req.params.id);
    if (group.ownerId !== id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        cohort,
        schedules,
        location,
      },
      { new: true },
    );
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for deleting a group
exports.deleteGroup = async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for adding a resource to a group
exports.addResourceToLibrary = async (req, res) => {
  try {
    const {
      groupId, title, link, description, tags,
    } = req.body;
    const newResource = await Resource({
      title,
      link,
      description,
      tags,
    });
    await newResource.save();
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $push: { resourceLibrary: newResource._id } },
      { new: true },
    );

    res.status(201).json(updatedGroup);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for getting all resources in a group
exports.getResources = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate(
      'resourceLibrary',
    );
    res.status(200).json(group.resourceLibrary);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for updating a resource in a group
exports.updateResource = async (req, res) => {
  try {
    const {
      groupId, resourceId, title, link, description, tags,
    } = req.body;
    const updatedResource = await resourceController.updateResource(
      resourceId,
      {
        title,
        link,
        description,
        tags,
      },
      { new: true },
    );
    if (!updatedResource) {
      res.status(404).json({ message: 'Resource not found' });
    }
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { resourceLibrary: updatedResource._id } },
      { new: true },
    );
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for deleting a resource from a group
exports.deleteResource = async (req, res) => {
  try {
    const { groupId, resourceId } = req.params;
    const deletedresource = await resourceController.deleteResource(resourceId);
    if (!deletedresource) {
      res.status(404).json({ message: 'Resource not found' });
    }
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { resourceLibrary: resourceId } },
      { new: true },
    );
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
