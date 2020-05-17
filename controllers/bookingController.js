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

	var centreId = req.query.centre_id;

	blockTimes = [[30,510], [1080,1440]]; //block non operation hours
	timeInterval = "half";
	showTimeAsString = true;
	includeStartBlockedTime = false;
	includeEndBlockedTime = false;

	var dateArray = [];
    var currentDate = moment();
    var endDate = moment().add(2, 'w');
    var bookedSlots = Booking.find({slot_date: { "$gte": currentDate.toDate(), "$lt": endDate.toDate() }, centre_id: centreId}, function(err, data){
    	

    	while (currentDate <= endDate) {

    		var isWeekend = moment(currentDate).day()%6==0;
    		if (!isWeekend) {
    			var blockedSlots = [];
    			for (var i =0; i < data.length; i++) { // loop db
    				var dbDate = moment(data[i].slot_date).format('YYYY-MM-DD');
    				if (dbDate == currentDate.format('YYYY-MM-DD')) {
    					var blockedSlot = data[i].slot_range[0];
    					blockedSlots.push(blockedSlot);
    				}
    				
    			}
    			var timeslots = tc.getTimeSlots(blockTimes, showTimeAsString, timeInterval, includeStartBlockedTime, includeEndBlockedTime);
    			var available_date = {date: currentDate.format('YYYY-MM-DD'), slots: timeslots, blocked_slot: blockedSlots};
    			dateArray.push(available_date);
    		}
    		currentDate = moment(currentDate).add(1, 'days');
    	}

    	res.json({available_dates: dateArray});

    });

    
 //    while (currentDate <= endDate) {
 //    	var isWeekend = moment(currentDate).day()%6==0;
 //    	if (!isWeekend) {
 //    		var timeslots = tc.getTimeSlots(blockTimes, showTimeAsString, timeInterval, includeStartBlockedTime, includeEndBlockedTime);
 //    		var available_date = {date: moment(currentDate).format('YYYY-MM-DD'), slots: timeslots};
 //    		dateArray.push(available_date);
 //    	}
 //        currentDate = moment(currentDate).add(1, 'days');
 //    }

	// res.json({available_dates: dateArray});
}

exports.book = function(req, res) {
	var bookingId = req.body._id;
	var centreId = req.body.centre_id;
	var timeSlot = parseInt(req.body.slot);
	var date = moment.utc(req.body.date, "YYYY-MM-DD");

	var slotRange = [timeSlot, timeSlot+30];

	var result = Booking.findOneAndUpdate({_id: bookingId}, {$set:{slot_date: date, slot_range: slotRange, centre_id: centreId}}, {new: true}, function(err, data){
		if (err) throw err;
		res.json(data);
	});
	
}













