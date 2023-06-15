const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
// need to use regular function rather than arrow function as using 'this' keyword within body
userSchema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be completed')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    // validation end
    
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    // bcrypt uses salt - a random string of characters that get added to thhe password before hashing.
    // stops hackers from password matching

    // generate salt - argument is the number of characters that gets added. The longer the number, the harder for the hacker,
    // but also the longer it takes for a user to sign up, so you need a happy medium. Usual number is 10
    const salt = await bcrypt.genSalt(10)

    // then hash the password
    const hash = await bcrypt.hash(password, salt)

    // create the document
    const user = await this.create({ email, password: hash })

    // return the user so the function can be called elsewhere
    return user
}


module.exports = mongoose.model('User', userSchema)