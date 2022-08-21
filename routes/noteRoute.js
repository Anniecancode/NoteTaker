// Include packages needed for this application
const notes = require('express').Router();
const fs = require('fs')
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// DELETE a particular route
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received for notes. ID: ${req.params.id}`);

    let data = JSON.parse(fs.readFileSync("./db/db.json"));
    let parsedData = data.filter(element => element.id !== req.params.id);
    writeToFile("./db/db.json", parsedData);
    res.json(`Note deleted`);
});


// POST Route for a new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});


module.exports = notes;