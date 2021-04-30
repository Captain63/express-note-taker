// Import dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

// Initialize express app
const noteApp = express();
const PORT = process.env.PORT || 3001;

// Configures app to handle data parsing
noteApp.use(express.urlencoded({ extended: true }));
noteApp.use(express.json());

// Route handling for HTML pages
// Serves index.html
noteApp.get('/', (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// Serves CSS file for Notes page
noteApp.get('/assets/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, "/public/assets/css/styles.css")));

// Serves index.js file for Notes page
noteApp.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, "/public/assets/js/index.js")));

// Serves notes.html
noteApp.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

// Route handling for API requests
// Serves existing notes from db.json
noteApp.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        } else {
            // Sends response without converting to JSON since file format is already JSON
            return res.send(data);
        }
    })
});

// Accepts new note submissions
noteApp.post('/api/notes', (req, res) => {

    // Pulls existing notes from db.json file
    fs.readFile("./db/db.json", 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        } else {
            const currentNotes = JSON.parse(data);

            const newNote = req.body;

            // Assigns id property to newNote object
            newNote.id = shortid.generate();
            
            // Clones array of existing notes
            const updatedNotes = currentNotes.map(note => note);

            // Adds new note to array to then be written to db.json
            updatedNotes.push(newNote);

            // Overwrite db.json file with updatedNotes array
            fs.writeFile("./db/db.json", JSON.stringify(updatedNotes), (err) => err ? console.error(err) : console.log("Note saved"));

            res.json(newNote);
        }
    })
});

noteApp.delete('/api/notes/:id', (req, res) => {

    // Assigns requested id to variable
    const deletedNote = req.params.id;
    
    // Pulls existing notes from db.json file
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        } else {
            const currentNotes = JSON.parse(data);

            // Creates new array from existing notes array of all notes EXCEPT the note whose id matches the parameter
            const updatedNotes = currentNotes.filter(note => note.id !== deletedNote);

            // Overwites db.json file with array of notes minus deleted note
            fs.writeFile("./db/db.json", JSON.stringify(updatedNotes), (err) => err ? console.error(err) : console.log("Note deleted"));

            res.json("Success");
        }
    })
});

// Launch server to begin listening for requests
noteApp.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));