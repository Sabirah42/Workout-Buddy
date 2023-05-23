// Contains functions to pass into routes; this keeps the routes file cleaner

const Workout = require('../models/workoutModel')

// get all workouts


// get a single workout


// create a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// delete a workout

module.exports = {
    createWorkout
}