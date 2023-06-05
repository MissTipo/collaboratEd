const Group = require('../models/Group');

// Controller for creating a new group

exports.createGroup = async (req, res) => {
  const { name, description, cohort, schedules, location } = req.body;
  const newGroup = new Group({
    name,
    description,
    cohort,
    schedules,
    location,
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
  const { title, description, cohort, schedules, location } = req.body;
  try {
    const updatedGroup = await Group.findByIdAndUpdate(req.params.id, {
      title,
      description,
      cohort,
      schedules,
      location,
    }, { new: true });
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
