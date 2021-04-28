// Import dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Initialize express app
const noteApp = express();
const PORT = process.env.PORT || 3001;

// Route handling for HTML pages
// Serves index.html
noteApp.get('/', (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

noteApp.get('/notes/styles.css', (req, res) => res.sendFile(path.join(__dirname, "/public/assets/css/styles.css")));

noteApp.get('/index.js', (req, res) => res.sendFile(path.join(__dirname, "/public/assets/js/index.js")));

// Serves notes.html
noteApp.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

// Route handling for API requests
// Serves existing notes
noteApp.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json")
    .then(response => response.json());
})

// Launch server to begin listening for requests
noteApp.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));