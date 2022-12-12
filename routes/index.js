const express = require('express');

// Import modular router for /notes
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter); // This is for API routes: GET /api/notes, POST /api/notes

module.exports = app;
