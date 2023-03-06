const { response } = require('express');
const Hotels = require('../Models/hotels');
const user = require('../Models/user');
exports.hotels = (req, res) => {
    Hotels.find()
        .then(response => res.status(200).json({ message: 'Hotels', Hotels: response }))
        .catch(err => console.log(err))
}

exports.bookHotel = async (req, res) => {
        const availability = await checkBookingavailability(req)
        console.log(availability)
        const params = (req.params.hotelId).toString()
        console.log(params)
        const data = {
            HotelId : req.params.hotelId,
            date : req.body.date
        }
        if( !(typeof(availability) == 'string') ){ //if booking available
            console.log('inserting in user collection')
            console.log(req.body.By)
            const result = await user.updateOne({Name : req.body.By}, {$push: {'bookings': data} })
            console.log(result)
            Hotels.updateOne({ name: params }, { $push: { 'bookings': req.body } })
           // .then(user.updateOne({email : req.body.By}, {$push: {'bookings': data} }))
            .then(response => res.status(200).json({ message: `Booking confirmed on ${req.body.date}`, Output: response }))
            .catch(err => console.log(err))
        } else { //if booking not available
            res.status(200).json({message : "ALready booked by "+ availability})
        }
}

async function checkBookingavailability(req) {
    //To check whether the booking available or not on that particular date
    console.log('entered into fun')
    const result = await Hotels.findOne({ name: req.params.hotelId })
    console.log(result)
    const bookings = JSON.parse(JSON.stringify(result)).bookings
    const check = bookings.find(item => (item.date == req.body.date))
    console.log(JSON.stringify(check))
    if (check) {
        console.log('already Booked')
        return check.By
    } else {
        console.log('booking available')
        bookings.push(req.body)
        return bookings
    }
}