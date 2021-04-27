// Import dependencies
const express = require("express");
const path = require("path");

// Initialize express app
const noteApp = express();
const PORT = process.env.PORT || 3001;

// Launch server to begin listening for requests
noteApp.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));