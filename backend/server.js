// server.js is the entry file for the backend
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// create the express app
const app = express();

// middleware
// checks if the request has a body
app.use(express.json())

// fires for every request that comes in, so it's important to remember to run the 'next' function
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
// first argument sets the path
// second argument uses all the routes listed in workouts.js (required in line 5)
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests (once connected to MONGO db)
    app.listen(process.env.PORT, () => {
        console.log('Connected to db and listening on port 4000')
    })
})
.catch((error) => {
    console.log(error)
})

