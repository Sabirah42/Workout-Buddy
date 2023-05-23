// Contains functions to pass into routes; this keeps the routes file cleaner

const Workout = require('../models/workoutModel')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    // gets changeable id from the params
    const { id } = req.params
    const workout = await Workout.findById(id)

    if (!workout) {
        res.status(404).json({error: 'No such workout found'})
    } else {
        res.status(200).json(workout)
    }
}

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
    getWorkouts,
    getWorkout,
    createWorkout
}