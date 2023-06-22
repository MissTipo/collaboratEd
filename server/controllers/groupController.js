// Group controller

const db = require('../utils/db');
const Group = require('../models/Group');
const resourceController = require('./resourceController');
const Resource = require('../models/Resource');
// const { ObjectId } = require('mongoose').Types;

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

  // update the members of new group to include the owner
  newGroup.members.push(id);

  // update the user to include the new group
  await db.User.findOneAndUpdate(
    { _id: id },
    { $push: { groups: newGroup._id } },
    { new: true },
  );

  try {
    await newGroup.save();

    // populate the group with the members
    await newGroup.populate('members', 'name email -_id');

    res.status(201).json({ group: newGroup });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Controller for getting all groups
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for getting a single group by id
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate({
        path: 'members',
        select: 'name email -_id',
      })
      .populate({
        path: 'resourceLibrary',
        select: 'title link description tags -_id',
      });

    res.status(200).json({ group });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for updating a group
exports.updateGroup = async (req, res) => {
  // id of the user initiating the update
  const { id } = req.user;
  const {
    title, description, cohort, schedules, location,
  } = req.body;
  try {
    // Check if the user initiating the update is the owner of the group
    const group = await Group.findById(req.params.id);

    if (group.ownerId.valueOf() !== id) {
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
  const { groupId } = req.params;

  try {
    const {
      title, link, description, tags,
    } = req.body;

    if (!title || !link || !description || !tags) {
      return res
        .status(400)
        .json({ message: 'title, link, tags, and description are required' });
    }

    const ownerId = req.user.id;

    // Check if the user is a member of the group
    const group = await Group.findById(groupId);

    if (!group.members.includes(ownerId)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Create the resource and save it to the database
    const newResource = await Resource({
      ownerId,
      title,
      link,
      description,
      tags,
    });

    await newResource.save();

    // Update the group's resource library
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
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId).populate('resourceLibrary');
    res.status(200).json(group.resourceLibrary);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for updating a resource in a group
exports.updateResource = async (req, res) => {
  // Get details from the request
  const { resourceId } = req.params;
  const ownerId = req.user.id;
  const {
    title, link, description, tags,
  } = req.body;

  // Check if the user is the owner of the resource

  const resource = await Resource.findById(resourceId);

  if (!resource) {
    return res.status(404).json({ message: 'Resource not found' });
  }

  if (resource.ownerId.valueOf() !== ownerId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Update the resource

  try {
    const updatedResource = await Resource.findOneAndUpdate(
      { _id: resourceId },
      { $set: { title, link, description }, $addToSet: { tags } },
      { new: true },
    );
    if (!updatedResource) {
      res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json('Successfully updated resource');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for deleting a resource from a group
exports.deleteResource = async (req, res) => {
  // Get details from the request
  const { groupId, resourceId } = req.params;
  const ownerId = req.user.id;

  // Check if the user is the owner of the resource
  const resource = await Resource.findById(resourceId);

  if (!resource) {
    return res.status(404).json({ message: 'Resource not found' });
  }

  if (resource.ownerId.valueOf() !== ownerId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Delete the resource

  try {
    const deletedresource = await Resource.findByIdAndDelete(resourceId);
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
