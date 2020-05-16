var fs = require('fs');
const tc = require("time-slots-generator");

var Booking = require('../models/bookingModel');

exports.init = function(req, res){
	var data = req.body;
	console.log(req.body);
	var booking = new Booking();
    
    booking.car_make = req.body.car_make;
    booking.car_model = req.body.car_model;
    booking.phone_number = req.body.phone_number;


    booking.save(function (err) {
        if (err) throw err;
		res.json({
            message: 'New initial booking created!',
            data: booking
        });
    });
}

exports.centres = function(req, res) {
	var filename = 'centres.json';
	var readStream = fs.createReadStream(filename);
	readStream.on('open', function () {
		readStream.pipe(res);
	});
}

exports.slots = function(req, res){
	startTime = 9*60;
	endTime = 18*60;
	blockTimes = [[540,570]];
	timeInterval = "half";
	showTimeAsString = true;
	includeStartBlockedTime = false;
	includeEndBlockedTime = false;
	var timeslots = tc.getTimeSlots(blockTimes, showTimeAsString, timeInterval, includeStartBlockedTime, includeEndBlockedTime)

	res.json(timeslots);
}