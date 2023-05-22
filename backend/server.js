// server.js is the entry file for the backend
require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')

// create the express app
const app = express();

// middleware
// checks if the request has a body
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
// first argument sets the path
// second argument uses all the routes listed in workouts.js (required in line 5)
app.use('/api/workouts', workoutRoutes)

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port 4000')
})