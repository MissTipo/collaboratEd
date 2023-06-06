const express = require('express');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
// const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// Connect the user routes
app.use('/', userRoutes);

/* const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established")
}) */

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
