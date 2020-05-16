//bookingModel.js
var mongoose = require('mongoose');
// Setup schema
var centreSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    operation_hours_start: {
    	type: String,
    	default: "06:00"
    },
    operation_hours_end: {
    	type : String,
    	default: "18:00"
    }
});

var booking = module.exports = mongoose.model('booking', bookingSchema);
module.exports.get = function (callback, limit) {
    booking.find(callback).limit(limit);
}