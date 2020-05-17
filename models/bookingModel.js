//bookingModel.js
var mongoose = require('mongoose');
// Setup schema
var bookingSchema = mongoose.Schema({

    car_make: {
        type: String,
        required: true
    },
    car_model: {
        type: String,
        required: true
    },
    phone_number: {
    	type: String,
    	required: true
    },
    slot_date: {
    	type : Date,
    	default: null
    },
    slot_range: {
        type: Array,
        default: []
    }

});

var booking = module.exports = mongoose.model('booking', bookingSchema);
module.exports.get = function (callback, limit) {
    booking.find(callback).limit(limit);
}