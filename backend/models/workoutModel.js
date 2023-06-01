const mongoose = require('mongoose')

// a Schema defines the structure of a document in our database
const Schema = mongoose.Schema

// as we've set the requirements to true, a new workout document won't be able to be created/saved to the database
// without all of these properties. Second argument sets timestamps for when the doc was created
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

// creates a model which applies the Schema and interacts with a collection of that name
module.exports = mongoose.model('Workout', workoutSchema)