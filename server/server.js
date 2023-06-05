const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// Routes
const groupRoutes = require('./routes/groupRoutes');

app.use('/api', groupRoutes);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
