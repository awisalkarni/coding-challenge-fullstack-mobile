var fs = require('fs');
const tc = require("time-slots-generator");
var moment = require('moment'); // require
moment().format(); 


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

	blockTimes = [[30,510], [1080,1440]];
	timeInterval = "half";
	showTimeAsString = true;
	includeStartBlockedTime = false;
	includeEndBlockedTime = false;

	var dateArray = [];
    var currentDate = moment();
    var stopDate = moment().add(2, 'w');;
    while (currentDate <= stopDate) {
    	var isWeekend = moment(currentDate).day()%6==0;
    	console.log(isWeekend);
    	if (!isWeekend) {
    		var timeslots = tc.getTimeSlots(blockTimes, showTimeAsString, timeInterval, includeStartBlockedTime, includeEndBlockedTime);
    		var available_date = {date: moment(currentDate).format('YYYY-MM-DD'), slots: timeslots};
    		dateArray.push(available_date);
    	}
        currentDate = moment(currentDate).add(1, 'days');
    }

	res.json({available_dates: dateArray});
}