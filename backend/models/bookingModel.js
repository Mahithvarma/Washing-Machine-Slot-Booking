const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    time:{
        type: 'string',
        required: true
    },
    date:{
        type: 'string',
        required: true
    }
});

module.exports = mongoose.model("bookings", bookingSchema, "slots");