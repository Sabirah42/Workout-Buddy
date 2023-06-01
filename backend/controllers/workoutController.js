// Contains functions to pass into routes; this keeps the routes file cleaner

const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// GET ALL WORKOUTS
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// GET A SINGLE WORKOUT
const getWorkout = async (req, res) => {
    // gets changeable id from the params
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout found'})
    }
    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'No such workout found'})
    } 

    res.status(200).json(workout)
}

// CREATE A NEW WORKOUT
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please complete all highlighted fields', emptyFields })
    }

    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// DELETE A WORKOUT
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout found'})
    }
    // where '_id' from MongoDB = 'const id' above
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: 'No such workout found'})
    } 

    res.status(200).json(workout)
}

// UPDATE A WORKOUT
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout found'})
    }
    // where '_id' from MongoDB = 'const id' above
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        // 'req.body' is an object, so you need to spread these using '...'
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({error: 'No such workout found'})
    } 

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}