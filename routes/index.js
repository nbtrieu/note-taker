const express = require('express');

// Import modular router for /notes
const notesApiRouter = require('./apiRoutes');

const app = express();

app.use('/notes', notesApiRouter); // This is for API routes: GET /api/notes, POST /api/notes

module.exports = app;
