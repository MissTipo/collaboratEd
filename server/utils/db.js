// The database connection and the user model are exported from the file.

const mongoose = require('mongoose');
const User = require('../models/User');
const Group = require('../models/Group');

class Database {
  constructor() {
    // this.options = options ? options : {};
    // create connection to the database
    mongoose.connect('mongodb://localhost/mytest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', () => {
      console.log('Connected to DB');
    });

    // the user model
    this.User = User;

    // the group model
    this.Group = Group;
  }

  // close the database connection
  closeConnection() {
    this.db.close();
  }
}

const db = new Database();
module.exports = db;
