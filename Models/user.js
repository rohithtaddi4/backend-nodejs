const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Registering the City Schema
const usersSchema = new Schema({
    // Name:{
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    bookings: {
        type: Array
    }
})

module.exports = mongoose.model('users', usersSchema );   // exporting the model