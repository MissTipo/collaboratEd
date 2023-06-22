// User controller

const bcrypt = require('bcrypt');
const fs = require('fs');
const db = require('../utils/db');
const cloudinary = require('../utils/cloudinary');

// define the userController object

const userController = {
  // get all users
  async getStats(req, res) {
    try {
      const users = await db.User.find({});
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  },

  // register new user
  async newUser(req, res) {
    const {
      name, email, phone, password,
    } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }

    try {
      // Check for existing user
      const isExist = await db.User.findOne({ email });
      if (isExist) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash the password before creating a new user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await db.User.create({
        name,
        email,
        phone,
        password: hashedPassword,
      });

      return res.status(201).json({
        user: newUser,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // update existing user by id
  async updateUser(req, res) {
    const { id } = req.user;

    // Get password and other updates
    const { password, ...updateData } = req.body;

    // Hash the password before updating if it exists
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update he password in the object
      updateData.password = hashedPassword;
    }

    try {
      const updatedUser = await db.User.findOneAndUpdate(
        { _id: id },
        { $set: updateData },
        // { $set: { password: hashedPassword } },
        { new: true },
      );
      res.status(201).json({
        user: await updatedUser.populate('groups', {
          name: 1,
          description: 1,
          cohort: 1,
          department: 1,
        }),
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete a user by id
  async deleteUser(req, res) {
    const { id } = req.user;
    try {
      await db.User.findOneAndRemove({ _id: id });
      res.status(201).json('User deleted successfully');
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Add user to a group
  async addUserToGroup(req, res) {
    const { id } = req.user;
    const { groupId } = req.params;
    try {
      const group = await db.Group.findOne({ _id: groupId });
      if (!group) {
        return res.status(400).json({ error: 'Group does not exist' });
      }

      // ckeck if user is already in the group
      const user = await db.User.findOne({ _id: id });
      if (user.groups.includes(groupId)) {
        return res.status(400).json({ error: 'User already in the group' });
      }

      // Update the group members list with the new user
      await db.Group.findOneAndUpdate(
        { _id: groupId },
        { $push: { members: id } },
        { new: true },
      );

      // Add the user group list with the new group
      const updatedUser = await db.User.findOneAndUpdate(
        { _id: id },
        { $push: { groups: group._id } },
        { new: true },
      );

      // poplulate the user with the group details
      await updatedUser.populate('groups', {
        name: 1,
        description: 1,
        cohort: 1,
        department: 1,
      });

      return res.status(201).json({ user: updatedUser });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Remove user from a group
  async removeUserFromGroup(req, res) {
    const { id } = req.user;
    const { groupId } = req.params;
    try {
      const group = await db.Group.findOne({ _id: groupId });
      if (!group) {
        return res.status(400).json({ error: 'Group does not exist' });
      }

      // ckeck if user is already in the group
      const user = await db.User.findOne({ _id: id });
      const isExist = await user.groups.find(
        (group) => group.valueOf() === groupId,
      );
      if (!isExist) {
        return res.status(400).json({ error: 'User not in the group' });
      }

      // Update the members of the group
      await db.Group.findOneAndUpdate(
        { _id: groupId },
        { $pull: { members: id } },
        { new: true },
      );

      // Remove the group from th list of groups for the user
      const updatedUser = await db.User.findOneAndUpdate(
        { _id: id },
        { $pull: { groups: group._id } },
        { new: true },
      );

      // poplulate the user with the group details
      await updatedUser.populate('groups', {
        name: 1,
        description: 1,
        cohort: 1,
        department: 1,
      });

      return res.status(201).json({ user: updatedUser });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // get all groups for a user
  async getUserGroups(req, res) {
    const { id } = req.user;
    try {
      const user = await db.User.findOne({ _id: id });

      // Get all groups for the user
      const { groups } = user;

      // Get the details for each group
      const groupsDetails = await db.Group.find({ _id: { $in: groups } });

      // filter and return some details for each group
      const filteredGroups = groupsDetails.map((group) => ({
        name: group.name,
        description: group.description,
        cohort: group.cohort,
        department: group.department,
      }));

      return res.status(201).json(filteredGroups);
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Upload profile picture to cloudinary
  async uploadProfilePicture(req, res) {
    const { id } = req.user;
    const { file } = req;
    try {
      const user = await db.User.findOne({ _id: id });
      if (!user) {
        return res.status(400).json({ error: 'User does not exist' });
      }

      // Upload the image to cloudinary
      const uploadedImage = await cloudinary.uploader.upload(file.path);

      // Delete file from local folder
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('File deletion error:', err);
        }
      });

      // Delete previous image from cloudinary
      if (user.cloudinaryId) {
        await cloudinary.uploader.destroy(user.cloudinaryId);
      }

      // Get the image url and public id
      const update = {
        pictureUrl: uploadedImage.secure_url,
        cloudinaryId: uploadedImage.public_id,
      };

      // Update the user with the new update
      const updatedUser = await db.User.findOneAndUpdate(
        { _id: id },
        { $set: update },
        { new: true },
      );

      // poplulate the user with the group details
      await updatedUser.populate('groups');

      return res.status(201).json({ user: updatedUser });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete profile picture from cloudinary and update user
  async deleteProfilePicture(req, res) {
    const { id } = req.user;
    try {
      const user = await db.User.findOne({ _id: id });
      if (!user) {
        return res.status(400).json({ error: 'User does not exist' });
      }

      // Delete the image from cloudinary
      await cloudinary.uploader.destroy(user.cloudinaryId);

      // Update the user with the new update
      const updatedUser = await db.User.findOneAndUpdate(
        { _id: id },
        { $set: { pictureUrl: '', cloudinaryId: '' } },
        { new: true },
      );

      // poplulate the user with the group details
      await updatedUser.populate('groups');

      return res.status(201).json({ user: updatedUser });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = userController;
