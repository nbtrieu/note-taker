const express = require('express');
const notes = express.Router();
const { join } = require('path');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const {v4 : uuidv4} = require('uuid'); // **ASK: this is the npm package for giving each note a unique id when it's saved right?

// GET route for reading the db.json file and returning all saved notes as JSON
notes.get('/', (req, res) => {
  console.log(`${req.method} request received to retrieve saved notes`);
  
  readFromFile(join(__dirname, '..', 'db', 'db.json'))
  .then((data) => res.json(JSON.parse(data)));
})

// POST route for receiving a new note to save on the request body, adding
// it to the db.json file, and then returning the new note to the client.
notes.post('/', (req, res) => {
  console.log(`${req.method} request received to save new note`);
  console.log(req.body);

  const { title, text } = req.body;

  const payload = {
    title: title,
    text: text,
    note_id: uuidv4(),
  };

  readAndAppend(payload, join(__dirname, '..', 'db', 'db.json'));
  console.log(`New note saved: `, payload);
  res.json(payload);
})

module.exports = notes;