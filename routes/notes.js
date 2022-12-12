const express = require('express');
const notes = express.Router();
const { join } = require('path');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET route for reading the db.json file and returning all saved notes as JSON
notes.get('/', (req, res) => {
  console.log(`${req.method} request received to retrieve saved notes`);
  readFromFile(join(__dirname, '..', 'db', 'db.json'))
  .then((data) => res.json(JSON.parse(data)));
})

// POST route for receiving a new note to save on the request body, adding
// it to the db.json file, and then returning the new note to the client.

module.exports = notes;