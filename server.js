// Import dependencies
const express = require("express");
const path = require("path");

// Initialize express app
const noteApp = express();
const PORT = process.env.PORT || 3001;

// Route handling for HTML pages
// Serves index.html
noteApp.get('/', (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// Serves notes.html
noteApp.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

// Launch server to begin listening for requests
noteApp.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));