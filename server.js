// Import dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

// Initialize express app
const noteApp = express();
const PORT = process.env.PORT || 3001;

noteApp.use(express.urlencoded({ extended: true }));
noteApp.use(express.json());

// Route handling for HTML pages
// Serves index.html
noteApp.get('/', (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// Serves CSS file for Notes page
noteApp.get('/notes/styles.css', (req, res) => res.sendFile(path.join(__dirname, "/public/assets/css/styles.css")));

// Serves index.js file for Notes page
noteApp.get('/index.js', (req, res) => res.sendFile(path.join(__dirname, "/public/assets/js/index.js")));

// Serves notes.html
noteApp.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

let currentNotes;

// Route handling for API requests
// Serves existing notes from db.json
noteApp.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        } else {
            
            currentNotes = JSON.parse(data);

            // Sends response without converting to JSON since file format is already JSON
            return res.send(data);
        }
    })
});

// Accepts new note submissions
noteApp.post('/api/notes', (req, res) => {
    const newNote = req.body;

    // Assigns id property to newNote object
    newNote._id = shortid.generate();
    
    // Clones current notes array
    const updatedNotes = currentNotes.map(note => note);

    // Adds newNote object to array
    updatedNotes.push(newNote);
    
    // Overwrite db.json file with updatedNotes array
    fs.writeFile("./db/db.json", JSON.stringify(updatedNotes), (err) => err ? console.error(err) : console.log("Note saved"));

    res.json(newNote);
});

// Launch server to begin listening for requests
noteApp.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));