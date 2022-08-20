// Include packages needed for this application
const express = require('express');
const path = require('path');
const api = require('./public/assets/js/index.js');

// Assign port for Heroku & local
const PORT = process.env.PORT || 3001;

const app = express ();

// Include middleware
app.use(express.json());
app.use(express.urlencoded({extendted: true}));
app.use('./api', api);

app.use(express.static('public'));


// Get route for home page
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '.public/assets/index.html')));

// Any invalid inputs will return home page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '.public/assets/index.html')));

// Get route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '.public/assets/notes.html')));


app.listen(PORT, () =>
  console.log(`Site is alive at http://localhost:${PORT}`))


