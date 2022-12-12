const express = require('express');
const notes = express.Router();
const { join } = require('path');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const {v4 : uuidv4} = require('uuid'); // **ASK: this is the npm package for giving each note a unique id when it's saved right?

// GET route for reading the db.json file and returning all saved notes as JSON
notes.get('/', (req, res) => {
  console.log(`${req.method} request received to retrieve saved notes`);
  
  readFromFile(join(__dirname, '..', 'db', 'db.json'))
  .then((data) => res.json(JSON.parse(data)))
  .catch((error) => res.status(500).json(error));
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
    id: uuidv4(),
  };

  readAndAppend(payload, join(__dirname, '..', 'db', 'db.json'));
  console.log(`New note saved: `, payload);
  res.json(payload)
  // .catch((error) => res.status(500).json(error));
})

// DELETE route for receiving a query parameter containing the id of a note to delete
notes.delete('/:id', (req, res) => {
  console.log(`${req.method} request received to delete note`);
  readFromFile(join(__dirname, '..', 'db', 'db.json'))
  .then((data) => JSON.parse(data).filter((note) => note.id !== req.params.id)) // **NOTE: MUST PARSE DATA before doing anything with it!! Also must use req.params.id when referring to the id passed into the query parameter!!
  .then((filteredNotes) => writeToFile(join(__dirname, '..', 'db', 'db.json'), filteredNotes));

  res.json(`Note deleted`);
})

module.exports = notes;
