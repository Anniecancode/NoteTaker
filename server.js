// Include packages needed for this application
const express = require('express');
const path = require('path');
const api = require('./routes/apiRoute.js');

// Assign port for Heroku & local
const PORT = process.env.PORT || 3001;

const app = express();

// Include middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Any invalid inputs will return home page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
