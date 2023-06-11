// Schema definition for the community forum

const mongoose = require('mongoose');
const forumSchema = new mongoose.Schema({
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

module.exports = mongoose.model('Forum', forumSchema);
