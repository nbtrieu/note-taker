const fs = require('fs');
const express = require('express');
const apiRoutes = require('./routes/index.js')
const path = require('path');

const port = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) => {
  console.log('Routing to homepage');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// GET route for note taking page
app.get('/notes', (req, res) => {
  console.log('Routing to note taking page');
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
})

// GET route for 404 error page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '404.html'));
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`);
})