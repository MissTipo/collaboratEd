const Resource = require('../models/Resource');

// upload resource
exports.uploadResource = async (req, res) => {
  try {
    const { title, description, link, tags } = req.body;
    const newResource = new Resource({
      title,
      description,
      link,
      tags,
    });
    await newResource.save();
    res.status(200).json({ message: 'Resource uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// get all resources
exports.getAllResources = async (_, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// get resource by id
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'resource not found/' })
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// update resource
exports.updateResource = async (req, res) => {
  try {
    const { title, description, link, tags } = req.body;
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      { title, description, link, tags },
      { new: true }
    );
    if (!updatedResource) {
      return res.status(404).json({ message: 'resource not found/' })
    }
    res.status(200).json({ message: 'resource updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// delete resource
exports.deleteResource = async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ message: 'resource not found/' })
    }
    res.status(200).json({ message: 'resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
