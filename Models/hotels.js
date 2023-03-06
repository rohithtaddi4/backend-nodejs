const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Registering the City Schema
const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    bookings : {
        type: Array
    },
    images : {
        type : String
    }
})

module.exports = mongoose.model('Hotels', hotelSchema, 'Hotels');   // exporting the model