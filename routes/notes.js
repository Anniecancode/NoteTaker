// Include packages needed for this application
const express = require('express');
const { readFromFile, readAndAppend } = require('../helper/fsUtils');

// Router page
const notes = express.Router();

// Get route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// Post route for submitting notes
notes.post('/', (req, res) => {
    console.log(req.body);

    const {noteTitle, noteText} = req.body;
    if (noteTitle && noteText) {
        const newNote = {
            noteTitle, 
            noteText
        };
    
        readAndAppend(newNote, './db/db.json');

        const responce = {
            status: 'success',
            body: newNote,
        };
        res.status(201).json(responce)
    } else {
        res.status(500).json('Error in posting!')
    }
})


module.exports = notes