// server.js is the entry file for the backend
const express = require('express')

// create tthe express app
const app = express();

// listen for requests
app.listen(4000, () => {
    console.log('Listening on port 4000')
})